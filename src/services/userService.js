const { findUser, createUser } = require("../repositeries/userRepository");
const { createCart } = require('../repositeries/cartRepository');

async function registerUser(userDetails) {
    console.log("Hitting service layer")
    // It will create a brand new user in the db

    // 1. We need to check if the user with this email and mobile number already exists or not
    const user = await findUser({
        email: userDetails.email,
        mobileNumber: userDetails.mobileNumber
    });
    console.log("1")

    if(user) {
        // we found a user
        throw { reason: 'User with the given email and mobile number already exist', statusCode: 400 }
    }
    console.log("2")

    // 2. If not then create the user in the database
    const newUser = await createUser({
        email: userDetails.email,
        password: userDetails.password,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        mobileNumber: userDetails.mobileNumber,
        role: userDetails.role
    });
    console.log("3")

    if(!newUser) {
        throw {reason: 'Something went wrong, cannot create user', statusCode: 500}
    }
    console.log("4")
    // await createCart(newUser._id);
    console.log("5")
    // 3. retuern the details of created user
    return newUser;
}


module.exports = {
    registerUser
};