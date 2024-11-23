const mongoose = require('mongoose');
const serverConfig = require('./serverConfig');

/*
Connection to mongo db
*/

async function connectDB() {
    try{
        await mongoose.connect();
        console.log("Successfully connected to the mongoose server")
    }catch(error){
    }
}

module.exports = connectDB;