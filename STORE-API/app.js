require("dotenv").config()
require("express-async-errors") // Faz a função do async wrapper, apenas precisando throw um erro
const express = require("express");
const app = express();
const notFoundMiddleware = require("./middleware/not-found.js")
const errorMiddleware = require("./middleware/error-handler.js")
const mongoose = require("mongoose")
const connectDB = require("./db/connect.js")
const productsRouter = require("./routes/products.js")

//middleware
app.use(express.json());

//routes
/*
app.use("/", (req,res) => {
    res.send('<h1>STORE API</h1><a href="/api/v1/products">Products Route</a>')
})
*/


app.use("/api/v1/products", productsRouter)

// products route
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}...`))
    } catch (error) {
       console.log("Connection Failed!") 
    }
}

start()