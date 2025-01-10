const NotFoundError = require("../utils/notFoundError");
const { getCardByUserId } = require("../repositeries/cartRepository");
const Cart = require("../schema/cartSchema");
const { getProduct } = require("../controllers/productController");
const { getProductById } = require("./productServices");
const AppError = require("../utils/appError");
const BadRequestError = require("../utils/badRequest");

async function getCard(userId) {
  const cart = await getCardByUserId(userId);
  if (!cart) {
    throw new NotFoundErrord("Cart");
  }
  return cart;
}

async function addToCart(userId, productId) {
  const cart = await getCard(userId);
  const product = await getProductById(productId);
  if (!product) {
    throw new NotFoundErrord("Product");
  }
  if (!product.inStock && product.quantity <= 0) {
    throw new BadRequestError(["Product not available in stock"]);
  }
  let foundProduct = false;
  cart.items.forEach((item) => {
    if (item.product === productId) {
      item.quantity += 1;
      foundProduct = true;
    }
  });
  if (!foundProduct) {
    cart.items.push({
      product: productId,
      quantity: 1,
    });
  }
  await cart.save();

  product.quantity -= 1;

  await product.save();

  return cart;
}

module.exports = {
  getCard,
  addToCart,
};
