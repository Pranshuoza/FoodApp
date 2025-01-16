const { findUser } = require("../repositeries/userRepository");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRY } = require("../config/serverConfig");

async function loginUser(authDetails) {
    const email = authDetails.email;
    const plainPassword = authDetails.password;
    console.log("1.1")
    // 1. Check if there is a registered user with the given email
    const user = await findUser({ email });
    console.log("1.2")
    if(!user) {
        throw {message: "No user found with the given email", statusCode: 404};
    }
    console.log("1.3")
    console.log(plainPassword,user.password)
    // 2. If the user is found we need to compare plainIncomingPassword with hashedPass
    const isPasswordValidated = plainPassword==user.password?true:false  
    console.log("1.4")
    if(!isPasswordValidated) {
        throw {message: "Invalid password, please try again", statusCode: 401};
    }
    console.log("1.5")
    const userRole = user.role ? user.role : "USER";
    console.log("1.6")
    // 3. If the password is validated, create a token ansd return it
    const token = jwt.sign({ email: user.email, id: user._id, role: userRole }, JWT_SECRET, {
        expiresIn: JWT_EXPIRY
    });
    console.log("1.7")
    return {token, userRole, userData: {
        email: user.email,
        firstName: user.firstName,
    }};
}

module.exports = {
    loginUser
}