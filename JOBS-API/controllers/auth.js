const User = require("../models/User.js")
const {StatusCodes} = require("http-status-codes")
const {BadRequestError, UnauthenticatedError} = require("../errors/index.js")
const jwt = require("jsonwebtoken")

const register = async (req,res) => {
    const user = await User.create({...req.body});
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({user: {name: user.name}, token})
}

const login = async (req,res) => {
    const{email, password} = req.body;
    if(!email || !password) {
        throw new BadRequestError("Please provide an email and password!")
    }
    const user = await User.findOne({email: email});
    if(!user) {
        throw new UnauthenticatedError("Invalid Credentials");
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if(isPasswordCorrect) {
        const token = user.createJWT();
        res.status(StatusCodes.OK).json({user: {name: user.name}, token})
    }
    throw  new UnauthenticatedError("Invalid password!")
    

}

module.exports = {
    register,
    login,
}

