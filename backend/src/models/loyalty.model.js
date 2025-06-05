const mongoose = require('mongoose');

const loyaltySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'El programa de lealtad debe pertenecer a un usuario'],
      unique: true,
    },
    points: {
      type: Number,
      default: 0,
      min: [0, 'Los puntos no pueden ser negativos'],
    },
    tier: {
      type: String,
      enum: ['bronze', 'silver', 'gold', 'platinum', 'diamond'],
      default: 'bronze',
    },
    tierProgress: {
      type: Number,
      default: 0,
      min: [0, 'El progreso no puede ser negativo'],
      max: [100, 'El progreso máximo es 100%'],
    },
    nextTier: {
      type: String,
      enum: ['bronze', 'silver', 'gold', 'platinum', 'diamond', 'max'],
      default: 'silver',
    },
    pointsToNextTier: {
      type: Number,
      default: 100,
    },
    totalPointsEarned: {
      type: Number,
      default: 0,
      min: [0, 'Los puntos totales no pueden ser negativos'],
    },
    totalPointsSpent: {
      type: Number,
      default: 0,
      min: [0, 'Los puntos gastados no pueden ser negativos'],
    },
    transactions: [
      {
        type: {
          type: String,
          enum: ['earned', 'spent', 'expired', 'adjusted'],
          required: true,
        },
        points: {
          type: Number,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        source: {
          type: String,
          enum: ['purchase', 'review', 'referral', 'promotion', 'reward', 'adjustment', 'other'],
          required: true,
        },
        sourceId: {
          type: mongoose.Schema.Types.ObjectId,
          refPath: 'transactions.sourceModel',
        },
        sourceModel: {
          type: String,
          enum: ['Order', 'Review', 'User', 'Promotion', 'Reward', 'Admin'],
        },
        date: {
          type: Date,
          default: Date.now,
        },
        expiryDate: Date,
        status: {
          type: String,
          enum: ['active', 'used', 'expired', 'cancelled'],
          default: 'active',
        },
      },
    ],
    rewards: [
      {
        reward: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Reward',
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        description: String,
        pointsCost: {
          type: Number,
          required: true,
          min: [0, 'El costo en puntos no puede ser negativo'],
        },
        dateRedeemed: {
          type: Date,
          default: Date.now,
        },
        expiryDate: Date,
        code: String,
        status: {
          type: String,
          enum: ['active', 'used', 'expired', 'cancelled'],
          default: 'active',
        },
        usedDate: Date,
        orderId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Order',
        },
      },
    ],
    referrals: [
      {
        referredUser: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
        status: {
          type: String,
          enum: ['pending', 'completed', 'cancelled'],
          default: 'pending',
        },
        pointsEarned: {
          type: Number,
          default: 0,
        },
        completedDate: Date,
      },
    ],
    preferences: {
      emailNotifications: {
        type: Boolean,
        default: true,
      },
      pushNotifications: {
        type: Boolean,
        default: true,
      },
    },
    memberSince: {
      type: Date,
      default: Date.now,
    },
    lastActivity: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Índices
loyaltySchema.index({ user: 1 });
loyaltySchema.index({ tier: 1 });
loyaltySchema.index({ points: -1 });
loyaltySchema.index({ 'transactions.date': -1 });

// Virtuals
loyaltySchema.virtual('availablePoints').get(function () {
  return this.points;
});

loyaltySchema.virtual('tierName').get(function () {
  const tierNames = {
    bronze: 'Bronce',
    silver: 'Plata',
    gold: 'Oro',
    platinum: 'Platino',
    diamond: 'Diamante',
  };
  return tierNames[this.tier] || this.tier;
});

loyaltySchema.virtual('nextTierName').get(function () {
  if (this.nextTier === 'max') {
    return 'Nivel máximo alcanzado';
  }
  
  const tierNames = {
    bronze: 'Bronce',
    silver: 'Plata',
    gold: 'Oro',
    platinum: 'Platino',
    diamond: 'Diamante',
  };
  return tierNames[this.nextTier] || this.nextTier;
});

// Método para añadir puntos
loyaltySchema.methods.addPoints = async function (points, description, source, sourceId, sourceModel, expiryDate = null) {
  if (points <= 0) {
    throw new Error('Los puntos a añadir deben ser mayores que cero');
  }

  // Añadir transacción
  this.transactions.push({
    type: 'earned',
    points,
    description,
    source,
    sourceId,
    sourceModel,
    date: new Date(),
    expiryDate,
    status: 'active',
  });

  // Actualizar puntos
  this.points += points;
  this.totalPointsEarned += points;
  this.lastActivity = new Date();

  // Actualizar nivel y progreso
  await this.updateTier();

  return this.save();
};

// Método para gastar puntos
loyaltySchema.methods.spendPoints = async function (points, description, source, sourceId, sourceModel) {
  if (points <= 0) {
    throw new Error('Los puntos a gastar deben ser mayores que cero');
  }

  if (this.points < points) {
    throw new Error('No hay suficientes puntos disponibles');
  }

  // Añadir transacción
  this.transactions.push({
    type: 'spent',
    points: -points,
    description,
    source,
    sourceId,
    sourceModel,
    date: new Date(),
    status: 'used',
  });

  // Actualizar puntos
  this.points -= points;
  this.totalPointsSpent += points;
  this.lastActivity = new Date();

  // Actualizar nivel y progreso
  await this.updateTier();

  return this.save();
};

// Método para canjear una recompensa
loyaltySchema.methods.redeemReward = async function (rewardId, rewardName, pointsCost, description, expiryDate = null, code = null) {
  if (this.points < pointsCost) {
    throw new Error('No hay suficientes puntos para canjear esta recompensa');
  }

  // Añadir recompensa
  this.rewards.push({
    reward: rewardId,
    name: rewardName,
    description,
    pointsCost,
    dateRedeemed: new Date(),
    expiryDate,
    code,
    status: 'active',
  });

  // Gastar puntos
  await this.spendPoints(
    pointsCost,
    `Canje de recompensa: ${rewardName}`,
    'reward',
    rewardId,
    'Reward'
  );

  return this.save();
};

// Método para actualizar el nivel
loyaltySchema.methods.updateTier = async function () {
  const tierThresholds = {
    bronze: 0,
    silver: 100,
    gold: 500,
    platinum: 1000,
    diamond: 2500,
  };

  const tiers = Object.keys(tierThresholds);
  let currentTierIndex = tiers.indexOf(this.tier);
  
  // Determinar el nivel actual basado en los puntos totales
  for (let i = tiers.length - 1; i >= 0; i--) {
    if (this.totalPointsEarned >= tierThresholds[tiers[i]]) {
      this.tier = tiers[i];
      currentTierIndex = i;
      break;
    }
  }
  
  // Determinar el siguiente nivel
  if (currentTierIndex < tiers.length - 1) {
    const nextTierIndex = currentTierIndex + 1;
    this.nextTier = tiers[nextTierIndex];
    
    // Calcular puntos necesarios para el siguiente nivel
    const pointsNeeded = tierThresholds[this.nextTier] - this.totalPointsEarned;
    this.pointsToNextTier = Math.max(0, pointsNeeded);
    
    // Calcular progreso hacia el siguiente nivel
    const currentTierPoints = tierThresholds[this.tier];
    const nextTierPoints = tierThresholds[this.nextTier];
    const tierRange = nextTierPoints - currentTierPoints;
    const userProgress = this.totalPointsEarned - currentTierPoints;
    
    this.tierProgress = Math.min(100, Math.floor((userProgress / tierRange) * 100));
  } else {
    // Ya está en el nivel máximo
    this.nextTier = 'max';
    this.pointsToNextTier = 0;
    this.tierProgress = 100;
  }
};

// Método para añadir una referencia
loyaltySchema.methods.addReferral = async function (referredUserId) {
  // Verificar si ya existe esta referencia
  const existingReferral = this.referrals.find(
    (ref) => ref.referredUser.toString() === referredUserId.toString()
  );

  if (existingReferral) {
    throw new Error('Este usuario ya ha sido referido');
  }

  // Añadir referencia
  this.referrals.push({
    referredUser: referredUserId,
    date: new Date(),
    status: 'pending',
  });

  return this.save();
};

// Método para completar una referencia
loyaltySchema.methods.completeReferral = async function (referredUserId, pointsToAward) {
  // Encontrar la referencia
  const referral = this.referrals.find(
    (ref) => ref.referredUser.toString() === referredUserId.toString()
  );

  if (!referral) {
    throw new Error('Referencia no encontrada');
  }

  if (referral.status !== 'pending') {
    throw new Error('Esta referencia ya ha sido procesada');
  }

  // Actualizar referencia
  referral.status = 'completed';
  referral.pointsEarned = pointsToAward;
  referral.completedDate = new Date();

  // Añadir puntos
  await this.addPoints(
    pointsToAward,
    'Referencia completada',
    'referral',
    referredUserId,
    'User'
  );

  return this.save();
};

// Método estático para verificar y expirar puntos
loyaltySchema.statics.checkExpiredPoints = async function () {
  const now = new Date();
  
  // Encontrar todos los programas de lealtad con transacciones que expiran
  const loyaltyPrograms = await this.find({
    'transactions.expiryDate': { $lte: now },
    'transactions.status': 'active',
  });
  
  for (const program of loyaltyPrograms) {
    let pointsToExpire = 0;
    
    // Marcar transacciones como expiradas
    program.transactions.forEach((transaction) => {
      if (
        transaction.expiryDate &&
        transaction.expiryDate <= now &&
        transaction.status === 'active' &&
        transaction.type === 'earned'
      ) {
        transaction.status = 'expired';
        pointsToExpire += transaction.points;
      }
    });
    
    if (pointsToExpire > 0) {
      // Añadir transacción de expiración
      program.transactions.push({
        type: 'expired',
        points: -pointsToExpire,
        description: 'Puntos expirados',
        source: 'other',
        date: now,
        status: 'expired',
      });
      
      // Actualizar puntos
      program.points = Math.max(0, program.points - pointsToExpire);
      program.lastActivity = now;
      
      await program.save();
    }
  }
};

const Loyalty = mongoose.model('Loyalty', loyaltySchema);

module.exports = Loyalty;
