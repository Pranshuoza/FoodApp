const AppError = require("./appError");

class UnAuthaurisedError extends AppError{
    constructor() {
        super(`User is not authorised properly`, 500);
    }
}

module.exports = UnAuthaurisedError;