const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name!"],
        maxLength: 50,
        minLength: 5,
    },

    email: {
        type: String,
        required: [true, "Please provide a e-mail!"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid e-mail!"
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password!"],
        minLength: 6,
    },
})

UserSchema.pre("save", async function() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

UserSchema.methods.createJWT = function(){
    return jwt.sign(
        {userId:this._id, name:this.name},
        process.env.JWT_SECRET,
        {expiresIn: "30d"},
    )
}

UserSchema.methods.comparePassword = async function(reqPassword){
    const isMatch = await bcrypt.compare(reqPassword, this.password);
    return isMatch;
}
module.exports = mongoose.model("User", UserSchema);

