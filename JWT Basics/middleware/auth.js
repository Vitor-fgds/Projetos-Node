const jwt = require("jsonwebtoken")
const {UnauthenticadedError} = require("../errors/index.js")

const authenticationMiddleware = async (req,res,next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer")){
        throw new UnauthenticadedError("No token provided!") 
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const {id, username} = decoded
        req.user = {id, username}
    }catch (error) {
        throw new UnauthenticadedError("Not authorized access this route")
    }
    next()
}


module.exports = authenticationMiddleware;

