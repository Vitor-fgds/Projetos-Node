require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const authenticateUser = require("./middleware/authentication.js")

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

app.set("trust proxy", 1)
app.use(rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 100,
}));

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());


// extra packages

// routes
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
