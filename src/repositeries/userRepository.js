const User = require('../schema/userSchema')

class userRepository {
    async findUser(parameter){
        try {
            const response = await User.findOne({...parameter});
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async createUser(userDetails) {
        try {
            const response = await User.create(userDetails);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = userRepository;