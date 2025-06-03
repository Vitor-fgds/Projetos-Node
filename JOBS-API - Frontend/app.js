require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const authenticateUser = require("./middleware/authentication.js")
const path = require("path");
const { dir } = require("console")

// extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");



//connectDB
const connectDB = require("./db/connect.js")

//routers
const authRouter = require("./routes/auth.js");
const jobsRouter = require("./routes/jobs.js")

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
app.use(express.static("./public"))



// extra packages

// routes

app.get("/jobs/login", (req,res) => {
  res.sendFile(path.join(__dirname, "public", "html", "login.html"))
})

app.get("/jobs/register", (req,res) => {
  res.sendFile(path.join(__dirname, "public", "html", "register.html"))
})


app.get("/jobs/register-succeeded", (req,res) => {
  res.sendFile(path.join(__dirname, "public", "html", "register-succeeded.html"))
})

app.get("/jobs", (req,res) => {
  res.sendFile(path.join(__dirname, "public", "html", "jobs.html"))
})

app.get("/job/update/:id", (req,res) => {
  res.sendFile(path.join(__dirname, "public", "html", "update.html"))
})


app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);




app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
