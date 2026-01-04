import axios from "axios";
//  Local
axios.defaults.withCredentials = true;
const websiteBaseURL = "http://localhost:3000";

// Production
// const websiteBaseURL = "https://crud-app-backend-delta.vercel.app";

const clientBaseURL = axios.create({
  baseURL: websiteBaseURL,
});

const authBasePath = "/api/auth";
const userBasePath = "/api/user";
const clientEndPoints = {
  ////////////////Authentication Routes////////////////

  register: `${authBasePath}/register`,
  login: `${authBasePath}/login`,
  logout: `${authBasePath}/logout`,
  sendVerificationOTP: `${authBasePath}/send-verify-otp`,
  verifyAccount: `${authBasePath}/verify-account`,
  isAuthenticated: `${authBasePath}/is-auth`,
  sendResetOTP: `${authBasePath}/send-reset-otp`,
  resetPassword: `${authBasePath}/reset-password`,

  ////////////////User Routes////////////
  userData: `${userBasePath}/data`,
};

export { clientBaseURL, clientEndPoints };
