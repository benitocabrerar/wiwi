const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Una reseña debe pertenecer a un usuario'],
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Una reseña debe pertenecer a un producto'],
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    },
    rating: {
      type: Number,
      required: [true, 'Una reseña debe tener una calificación'],
      min: [1, 'La calificación mínima es 1'],
      max: [5, 'La calificación máxima es 5'],
    },
    title: {
      type: String,
      trim: true,
      maxlength: [100, 'El título no puede tener más de 100 caracteres'],
    },
    comment: {
      type: String,
      required: [true, 'Una reseña debe tener un comentario'],
      trim: true,
      maxlength: [1000, 'El comentario no puede tener más de 1000 caracteres'],
    },
    pros: [String],
    cons: [String],
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        alt: {
          type: String,
          default: '',
        },
      },
    ],
    isVerifiedPurchase: {
      type: Boolean,
      default: false,
    },
    isRecommended: {
      type: Boolean,
      default: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    isHelpful: {
      count: {
        type: Number,
        default: 0,
      },
      users: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
    },
    isNotHelpful: {
      count: {
        type: Number,
        default: 0,
      },
      users: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
    },
    reply: {
      content: String,
      date: Date,
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    rejectionReason: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Índices
reviewSchema.index({ product: 1, user: 1 }, { unique: true });
reviewSchema.index({ product: 1, createdAt: -1 });
reviewSchema.index({ user: 1, createdAt: -1 });
reviewSchema.index({ rating: 1 });
reviewSchema.index({ isApproved: 1 });

// Middleware para verificar si la compra está verificada
reviewSchema.pre('save', async function (next) {
  if (this.isNew && this.order) {
    // Verificar si el usuario ha comprado el producto
    const Order = mongoose.model('Order');
    const order = await Order.findOne({
      _id: this.order,
      user: this.user,
      'items.product': this.product,
      status: 'completed',
    });

    if (order) {
      this.isVerifiedPurchase = true;
      // Si la compra está verificada, aprobar automáticamente la reseña
      this.isApproved = true;
      this.status = 'approved';
    }
  }

  next();
});

// Middleware para actualizar la calificación del producto después de guardar/actualizar una reseña
reviewSchema.post('save', async function () {
  // Actualizar la calificación del producto
  await this.constructor.calcAverageRating(this.product);
});

reviewSchema.post('remove', async function () {
  // Actualizar la calificación del producto después de eliminar una reseña
  await this.constructor.calcAverageRating(this.product);
});

// Método estático para calcular la calificación promedio
reviewSchema.statics.calcAverageRating = async function (productId) {
  const Product = mongoose.model('Product');
  await Product.updateRating(productId);
};

// Método para marcar una reseña como útil
reviewSchema.methods.markAsHelpful = async function (userId) {
  // Verificar si el usuario ya ha marcado esta reseña como útil
  const isAlreadyHelpful = this.isHelpful.users.includes(userId);
  const isAlreadyNotHelpful = this.isNotHelpful.users.includes(userId);

  if (isAlreadyHelpful) {
    // Si ya está marcada como útil, quitar la marca
    this.isHelpful.users.pull(userId);
    this.isHelpful.count -= 1;
  } else {
    // Marcar como útil
    this.isHelpful.users.push(userId);
    this.isHelpful.count += 1;

    // Si estaba marcada como no útil, quitar esa marca
    if (isAlreadyNotHelpful) {
      this.isNotHelpful.users.pull(userId);
      this.isNotHelpful.count -= 1;
    }
  }

  return this.save();
};

// Método para marcar una reseña como no útil
reviewSchema.methods.markAsNotHelpful = async function (userId) {
  // Verificar si el usuario ya ha marcado esta reseña como no útil
  const isAlreadyNotHelpful = this.isNotHelpful.users.includes(userId);
  const isAlreadyHelpful = this.isHelpful.users.includes(userId);

  if (isAlreadyNotHelpful) {
    // Si ya está marcada como no útil, quitar la marca
    this.isNotHelpful.users.pull(userId);
    this.isNotHelpful.count -= 1;
  } else {
    // Marcar como no útil
    this.isNotHelpful.users.push(userId);
    this.isNotHelpful.count += 1;

    // Si estaba marcada como útil, quitar esa marca
    if (isAlreadyHelpful) {
      this.isHelpful.users.pull(userId);
      this.isHelpful.count -= 1;
    }
  }

  return this.save();
};

// Método para añadir una respuesta a la reseña
reviewSchema.methods.addReply = async function (content, userId) {
  this.reply = {
    content,
    date: new Date(),
    user: userId,
  };

  return this.save();
};

// Método para aprobar o rechazar una reseña
reviewSchema.methods.updateStatus = async function (status, reason = null) {
  this.status = status;
  this.isApproved = status === 'approved';
  
  if (status === 'rejected' && reason) {
    this.rejectionReason = reason;
  }

  return this.save();
};

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
