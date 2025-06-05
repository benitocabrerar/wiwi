const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'La cantidad mínima es 1'],
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'El precio no puede ser negativo'],
  },
  image: {
    type: String,
    required: true,
  },
});

const shippingAddressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderItems: [orderItemSchema],
    shippingAddress: shippingAddressSchema,
    paymentMethod: {
      type: String,
      required: true,
      enum: ['stripe', 'paypal', 'efectivo'],
    },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },
    subtotal: {
      type: Number,
      required: true,
      min: [0, 'El subtotal no puede ser negativo'],
    },
    taxPrice: {
      type: Number,
      required: true,
      min: [0, 'El impuesto no puede ser negativo'],
    },
    shippingPrice: {
      type: Number,
      required: true,
      min: [0, 'El costo de envío no puede ser negativo'],
    },
    totalPrice: {
      type: Number,
      required: true,
      min: [0, 'El total no puede ser negativo'],
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    status: {
      type: String,
      required: true,
      enum: ['pendiente', 'procesando', 'enviado', 'entregado', 'cancelado'],
      default: 'pendiente',
    },
    trackingNumber: {
      type: String,
    },
    deliveredAt: {
      type: Date,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Índices para búsqueda
orderSchema.index({ user: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: -1 });

// Método para calcular el total del pedido
orderSchema.methods.calculateTotals = function () {
  // Calcular subtotal
  this.subtotal = this.orderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  
  // Calcular impuestos (ejemplo: 12%)
  this.taxPrice = this.subtotal * 0.12;
  
  // Calcular envío (ejemplo: gratis si el subtotal es mayor a $50)
  this.shippingPrice = this.subtotal > 50 ? 0 : 10;
  
  // Calcular total
  this.totalPrice = this.subtotal + this.taxPrice + this.shippingPrice;
  
  return this;
};

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
