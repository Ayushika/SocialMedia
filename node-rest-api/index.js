/** @format */

const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");
const connectDB = require("./connection");
const userRoute = require("./routes/userRoutes");
const authRoute = require("./routes/authRoutes");
const postRoute = require("./routes/postRoutes");

dotenv.config();

//MIDDLEWARE
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);

//CONNECT TO DATABASE
connectDB();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Backend server is running! on ${port}`);
});
