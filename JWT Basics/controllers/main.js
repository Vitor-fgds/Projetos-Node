const jwt = require("jsonwebtoken")
const CustomAPIError = require("../errors/custom-error.js")
const {BadRequestError} = require("../errors/index.js")

const login = async (req,res) => {
    const {username, password} = req.body
    if(!username || !password){
       throw new BadRequestError("Please provide email and password")
    }

    const id = new Date().getDate()
    const token = jwt.sign(
        {id: id, username: username}, 
        process.env.JWT_SECRET, 
        {expiresIn: "30d"})
    
    res.status(200).json({msg:"user created", token})
    res.send("Fake Login/Register/Signup Route")
}

const dashboard = async(req,res) => {
    console.log(req.user)
    const luckyNumber = Math.floor(Math.random()*100)
    res.status(200).json(
        {msg: `Hello, ${req.user.username}`, 
        secret: `Here is your authorized data, your lucky number is ${luckyNumber}`})
}


module.exports = {
    login,
    dashboard
}


