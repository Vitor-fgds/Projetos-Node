const CustomAPIError = require("./custom-error.js")
const {StatusCodes} = require("http-status-codes") //Facilita a leitura dos status
class BadRequest extends CustomAPIError{
    constructor(message){
        super(message);
        this.statusCode = StatusCodes.BAD_REQUEST // Facilita a leitura dos status
        
    }
}

module.exports = BadRequest