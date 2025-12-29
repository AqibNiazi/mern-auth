const express = require("express");
const {
  register,
  login,
  logout,
  sendVerifyOTP,
  verifyEmail,
} = require("../controller/auth.js");
const userAuth = require("../middleware/userAuth.js");
const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/send-verify-otp", userAuth, sendVerifyOTP);
authRouter.post("/verify-email", userAuth, verifyEmail);

module.exports = authRouter;
