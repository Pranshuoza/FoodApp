const express = require("express");
const { addProduct, deleteProduct, getProduct } = require("../controllers/productController");
const uploader = require("../middleware/multerMiddleware");

const productRouter = express.Router();

productRouter.post("/", uploader.single("productImage"), addProduct);
productRouter.get("/:id", getProduct);
productRouter.delete("/:id", deleteProduct);

module.exports = productRouter;