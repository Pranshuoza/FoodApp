const cloudinary = require('../config/cloudinaryConfig');
const ProductRepository = require('../repositeries/productRepository');
const fs = require('fs/promises');

async function createProduct() {
    const imagePath = productDetails.imagePath;
    if (imagePath) {
        try {
            const cloudinaryResponse = await cloudinary.uploader.upload(imagePath);
            var productImage = cloudinaryResponse.secure_url;   
            await fs.unlink(req.file.path);
        }
        catch (error) {
            console.log(error)
            throw {reason:'Not able to create product',statusCode:500}
        }
        
    }

    const product = await ProductRepository.createProduct({
        ...productDetails,
        productImage: productImage
    });

    if (!product) {
        throw {reason:'Not able to create product',statusCode:500}
    }

    return product;
}

module.exports = {
    createProduct
}