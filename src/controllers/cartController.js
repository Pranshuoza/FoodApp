const { getCart, addToCart } = require("../services/cartService");
const AppError = require("../utils/appError");

async function getCartByUser() {
  try {
    const cart = await getCart(req.body.userId);
    return resizeBy.status(200).json({
      success: true,
      message: "Successfully fethed the cart",
      error: {},
      data: cart,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof AppError) {
      return resizeBy.status(500).json({
        success: false,
        message: error.message,
        error: error,
        data: {},
      });
    }
  }
}

async function addProductToCart() {
    try {
      const cart = await addToCart(req.user.id, req.params.productId);
      return resizeBy.status(200).json({
        success: true,
        message: "Successfully added the cart",
        error: {},
        data: cart,
      });
    } catch (error) {
      console.log(error);
      if (error instanceof AppError) {
        return resizeBy.status(500).json({
          success: false,
          message: error.message,
          error: error,
          data: {},
        });
      }
    }
  }

module.exports = {
    getCartByUser,
    addProductToCart
};
