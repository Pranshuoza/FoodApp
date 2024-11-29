const dotenv = require('dotenv');
dotenv.config();


module.exports = {
    PORT :process.env.PORT,
    DB_URL : process.env.DB_URL ,
    JWT_SECRET: process.env.JWT_SECRET,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    CLOUDINARY_API: process.env.CLOUDINARY_API,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME
}