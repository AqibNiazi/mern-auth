require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const database = require("./src/database");
const cors = require("cors");
const HOST = process.env.HOST;
const app = express();
const PORT = process.env.PORT || 3000;
// const {
//   createUser,
//   updateUser,
//   getUsers,
//   deleteUser,
//   getUserBySlug,
// } = require("./src/requests/userRequests");

// Middlewares
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(bodyParser.json());

// Routes
// app.get("/users", getUsers);
// app.get("/user/:slug", getUserBySlug);
// app.post("/create-user", createUser);
// app.put("/update-user/:id", updateUser);
// app.delete("/delete-user/:id", deleteUser);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

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
