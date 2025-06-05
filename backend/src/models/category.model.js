const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre de la categoría es obligatorio'],
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'La descripción de la categoría es obligatoria'],
    },
    image: {
      type: String,
      required: [true, 'La imagen de la categoría es obligatoria'],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      default: null,
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
categorySchema.index({ name: 'text', description: 'text' });
categorySchema.index({ featured: 1 });
categorySchema.index({ parent: 1 });

// Relación virtual con productos
categorySchema.virtual('products', {
  ref: 'Product',
  foreignField: 'category',
  localField: '_id',
});

// Relación virtual con subcategorías
categorySchema.virtual('subcategories', {
  ref: 'Category',
  foreignField: 'parent',
  localField: '_id',
});

// Middleware para actualizar el slug antes de guardar
categorySchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
  }
  next();
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
