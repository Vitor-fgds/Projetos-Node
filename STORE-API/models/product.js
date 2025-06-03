const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please, enter a name!" ]
    },

    price: {
        type:Number,
        required:[true, "Please, enter a product price!"]
    },
    
    featured: {
        type: Boolean,
        default: false,
    },

    rating:{
        type:Number,
        default:4.5,
    },

    createdAt:{
        type: Date,
        default: Date.now(),
    },

    company: {
        type:String,
        enum:{
            values: ["ikea", "liddy", "caressa", "marcos"], // Limitando os possíveis valores para o atributo company
            message: `{VALUE} is not supported`,
        }

    }


})

const productModel = mongoose.model("Products", productSchema);
module.exports = productModel;