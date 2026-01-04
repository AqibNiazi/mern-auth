const express = require("express");
const {
  register,
  login,
  logout,
  sendVerifyOTP,
  verifyAccount,
  isAuthenticated,
  sendResetOtp,
  resetPassword,
} = require("../controller/authController.js");
const userAuth = require("../middleware/userAuth.js");
const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/send-verify-otp", userAuth, sendVerifyOTP);
authRouter.post("/verify-account", userAuth, verifyAccount);
authRouter.post("/is-auth", userAuth, isAuthenticated);
authRouter.post("/send-reset-otp", sendResetOtp);
authRouter.post("/reset-password", resetPassword);

module.exports = authRouter;
