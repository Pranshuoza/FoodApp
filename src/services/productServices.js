const coloudinary = require('../config/cloudinaryConfig');
const ProductRespository = require('../repositeries/productRepository');
const fs = require('fs/promises');
const InternalServerError = require('../utils/internalServerError');
const NotFoundError = require('../utils/notFoundError');

async function createProduct(productDetails) {
    const imagePath = productDetails.imagePath;
    if(imagePath) {
        try {
            const coloudinaryResponse = await coloudinary.uploader.upload(imagePath);
            var productImage = coloudinaryResponse.secure_url;
            console.log(productImage);
            await fs.unlink(process.cwd() + "/" + imagePath);
        } catch(error) {
            console.log(error);
            throw new InternalServerError();
        }
        
    }

    const product = await ProductRespository.createProduct({
        ...productDetails,
        productImage: productImage
    });

    console.log(product);
        
    return product;
    

}

async function getProductById(productId) {
    const response = await ProductRespository.getProductById(productId);
    if(!response) {
        throw new NotFoundError('Product');
    }
    return response;
}

// async function getAllProductsData() {
//     const response = await ProductRespository.getAllProducts();
//     if(!response) {
//         throw new NotFoundError('Product');
//     }
//     return response;
// }

async function deleteProductById(productId) {
    const response = await ProductRespository.deleteProductById(productId);
    if(!response) {
        throw new NotFoundError('Product');
    }
    return response;
}


module.exports = {
    createProduct,
    getProductById,
    deleteProductById,
    // getAllProductsData
}