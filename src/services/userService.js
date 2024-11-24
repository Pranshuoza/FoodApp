class UserService {
    constructor(userRepository) {
    this.userRepository = userRepository;
    }

    async registerUser(userDetails) {
        //New user creation
        //Check if user exist with same mail id or mobileNumber
        //If not create the user
        console.log("Hitting the service layer");
        const user = await this.userRepository.findUser({
        email: userDetails.email,
        mobileNumber: userDetails.mobileNumber,
        });

        if (user) {
        throw {
            reason: "User with the given email and mible number already exist",
            statusCode: 400,
        };
        }

        const newUser = await this.userRepository.createUser({
            email: userDetails.email,
            password: userDetails.password,
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            mobileNumber: userDetails.mobileNumber
        });

        if(!newUser){
            throw{reason: "Something went wrong, cannot create user", statusCode: 500};
        }
    }
}

module.exports = UserService;
