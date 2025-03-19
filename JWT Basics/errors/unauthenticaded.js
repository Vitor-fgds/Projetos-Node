const CustomAPIError = require("./custom-error.js")
const {StatusCodes} = require("http-status-codes") // Facilita a leitura
class UnauthenticadedError extends CustomAPIError{
    constructor(message){
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED // Facilita a leitura
        
    }
}

module.exports = UnauthenticadedError;