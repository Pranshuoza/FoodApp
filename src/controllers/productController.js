const { createProduct } = require("../services/productServices");

async function addProduct(req, res) {
  try {
    const product = await createProduct({
      productName: req.body.productName,
      description: req.body.description,
      imagePath: req.file.path,
      price: req.body.price,
      category: req.body.category,
      inStock: req.body.inStock,
    });
    return res.status(201).json({
      message: "Successfully created the product",
      success: true,
      error: {},
      data: product,
    });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json({
      message: error.reason,
      success: false,
      data: {},
      error: error,
    });
  }
}

module.exports = {
    addProduct
}