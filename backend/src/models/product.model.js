const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre del producto es obligatorio'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'La descripción del producto es obligatoria'],
    },
    price: {
      type: Number,
      required: [true, 'El precio del producto es obligatorio'],
      min: [0, 'El precio no puede ser negativo'],
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, 'El descuento no puede ser negativo'],
      max: [100, 'El descuento no puede ser mayor a 100%'],
    },
    images: [
      {
        type: String,
        required: [true, 'Al menos una imagen es obligatoria'],
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'La categoría del producto es obligatoria'],
    },
    stock: {
      type: Number,
      required: [true, 'El stock del producto es obligatorio'],
      min: [0, 'El stock no puede ser negativo'],
      default: 0,
    },
    sku: {
      type: String,
      required: [true, 'El SKU del producto es obligatorio'],
      unique: true,
      trim: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    specifications: {
      type: Map,
      of: String,
      default: {},
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, 'La calificación mínima es 0'],
      max: [5, 'La calificación máxima es 5'],
      set: (val) => Math.round(val * 10) / 10, // Redondear a 1 decimal
    },
    numReviews: {
      type: Number,
      default: 0,
      min: [0, 'El número de reseñas no puede ser negativo'],
    },
    active: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Índices para búsqueda
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1 });
productSchema.index({ price: 1 });
productSchema.index({ featured: 1 });

// Relación virtual con reseñas
productSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'product',
  localField: '_id',
});

// Middleware para actualizar el slug antes de guardar
productSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
  }
  next();
});

// Método para calcular el precio con descuento
productSchema.methods.getDiscountedPrice = function () {
  if (!this.discount) return this.price;
  return this.price - (this.price * this.discount) / 100;
};

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
