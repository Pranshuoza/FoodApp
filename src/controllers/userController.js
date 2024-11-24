const { model } = require('mongoose');
const UserService = require('../services/userService');
const userRepository = require('../repositeries/userRepository');

async function createUser( req , res){
    console.log("Controller called");
    console.log(req.body)

    const UserService = new UserService(new userRepository());
    try{
        const response = await UserService.registerUser(req.body);
    return res.json({
        message: 'Successfully registered the user',
        success: true,
        data: response,
        error: {}
    });
    }catch(error){
        return res.json({
            success: false,
            message: error.reason,
            data: {},
            error: error
        });
    }
}

module.exports = {
    createUser
}