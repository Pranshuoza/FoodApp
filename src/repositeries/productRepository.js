const product = require('../schema/productSchema')

async function createProduct(productDetails) {
    try {
        const response = await product.Produc.create({

        });
        return response;
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createProduct
}