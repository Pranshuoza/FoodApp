const mongoose = require("mongoose");

const cartScema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        require: true,
      },
      quantity: {
        type: Number,
        require: true,
        default: 1,
      },
    },
  ],
}, {
    timestamps: true;
});

const Cart = mongoose.model('Cart', cartScema);

module.exports = Cart;