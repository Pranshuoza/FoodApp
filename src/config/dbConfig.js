const mongoose = require('mongoose');
const ServerConfig = require('./serverConfig');


/*
Connection to mongo db
*/
async function connectDB() {
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("Successfully connected to the mongoose server");
    }catch(error){
        console.error("Error connecting to MongoDB:", error.message);
    }
}

module.exports = connectDB;