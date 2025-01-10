const { findUser, createUser } = require("../repositeries/userRepository");
const { createCart } = require('../repositeries/cartRepository');

async function registerUser(userDetails) {
    console.log("Hitting service layer")
    const user = await findUser({
        email: userDetails.email,
        mobileNumber: userDetails.mobileNumber
    });

    if(user) {
        throw { reason: 'User with the given email and mobile number already exist', statusCode: 400 }
    }
    
    const newUser = await createUser({
        email: userDetails.email,
        password: userDetails.password,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        mobileNumber: userDetails.mobileNumber
    });

    if(!newUser) {
        throw {reason: 'Something went wrong, cannot create user', statusCode: 500}
    }

    await createCart(newUser._id);

    return newUser;
}


module.exports = {
    registerUser
};