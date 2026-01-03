require("dotenv").config();
const express = require("express");
// const bodyParser = require("body-parser");
const database = require("./src/config/mongodb");
const cors = require("cors");
const HOST = process.env.HOST;
const app = express();
const PORT = process.env.PORT || 3000;
const authRouter = require("./src/Router/authRouter");
const userRouter = require("./src/Router/userRoutes");

const allowedOrigins = ["http://localhost:5173"];
// Middlewares
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());

// API Endpoints
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);


const NodeJsServer = async () => {
  try {
    await database();
    app.listen(PORT, HOST, () => {
      console.log(`Backend server is running at http://${HOST}:${PORT}`);
      console.log("Server running");
    });
  } catch (error) {
    console.log("error", error);
  }
};
NodeJsServer();
