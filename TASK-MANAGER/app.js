const express = require("express");
const app = express();
const tasks = require("./routes/tasks.js")
const connectDB = require("./db/connect.js")
require("dotenv").config()
const notFound = require("./middleware/not-found.js")
const errorHandlerMiddleware = require("./middleware/error-handler.js")

//middleware
app.use(express.static("./public"))
app.use(express.json())

// route
app.use("/api/v1/tasks", tasks)

app.use(notFound)
app.use(errorHandlerMiddleware)


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(3000, console.log("Server is listening on port 3000"))
    } catch(error){
        console.log(error)
    }
}

start()



