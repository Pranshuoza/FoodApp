const AppError = require("./appError");

class InternalServerError extends AppError{
    constructor(properties) {
        super(`It's not you it's out of server where something went wrong`, 500);
    }
}

module.exports = InternalServerError;