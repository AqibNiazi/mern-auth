// index.js
require("dotenv").config();
const express = require("express");
const database = require("./src/config/mongodb");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// Allowed origins (update for production frontend URL)
const allowedOrigins = [
  "http://localhost:5173",
  "https://your-frontend.vercel.app", // add your deployed frontend here
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routers
const authRouter = require("./src/Router/authRouter");
const userRouter = require("./src/Router/userRoutes");

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// Connect DB once at cold start
database();

// ✅ Export app instead of listening
module.exports = app;
