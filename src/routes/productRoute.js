const express = require("express");
const multer = require("multer");
const {storage} = require("../config/cloudinaryConfig");
const upload = multer({storage});
const {
  addProduct,
  deleteProduct,
  getProduct,
} = require("../controllers/productController");
// const uploader = require("../middleware/multerMiddleware");
const { isLoggedIn, isAdmin } = require("../validation/authValidator");

const productRouter = express.Router();

productRouter.post(
  "/",
  isLoggedIn,
  isAdmin,
  upload.single("productImage"),
  addProduct
);

productRouter.get("/:id", getProduct);
productRouter.delete("/:id", deleteProduct);

module.exports = productRouter;
