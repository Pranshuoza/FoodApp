const Cart = require("../schema/cartSchema");

async function createCart() {
  try {
    const newCart = await Cart.create({
      user: userId,
    });
    return newCart;
  } catch (error) {
    if (error.name === "ValidationError") {
      const errorMessageList = Object.keys(error.errors).map((property) => {
        return error.errors[property].message;
      });
      throw new BadRequestError();
    }
    console.log(error);
    throw new InternalServerError();
  }
}

async function getCard() {
  try {
    const cart = await cart.findOne({
      user: userId,
    });
    return cart;
  } catch (error) {
    console.log(error);
    throw new InternalServerError();
  }
}

module.exports = { createCart, getCard };
