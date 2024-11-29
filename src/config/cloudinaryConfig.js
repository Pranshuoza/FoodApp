const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API, CLOUDINARY_API_SECRET } = require('./serverConfig');

const coloudinary = require('cloudinary').v2;

coloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API,
    api_secret: CLOUDINARY_API_SECRET
});

module.exports = {
    coloudinary
}