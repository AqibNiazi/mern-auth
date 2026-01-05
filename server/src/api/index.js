require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRouter = require("../Router/authRouter");
const userRouter = require("../Router/userRouter");
const database = require("../config/mongodb");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://mern-auth-plum.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// DB connection (cached)
database();

module.exports = app;
