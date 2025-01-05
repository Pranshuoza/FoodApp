const NotFoundError = require("../utils/notFoundError");
const { getCardByUserId } = require("../repositeries/cartRepository");
const Cart = require("../schema/cartSchema");

async function getCard(userId) {
  const cart = await getCardByUserId(userId);
  if (!cart) {
    throw new NotFoundErrord("Cart");
  }
  return cart;
}

module.exports = {
  getCard,
};
