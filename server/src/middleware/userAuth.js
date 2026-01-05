const jwt = require("jsonwebtoken");

// First this middleware will run
// It will get the token from the cookies
// It will decode the token and add it in the request body
// Then it will verify the token
// If the token is valid, it will get the userId from the token
// Then it will pass the userId to the controller function


const userAuth = (req, res, next) => {
  const token = req.cookies?.token;

  // ❌ No token → Unauthorized
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized - Login again",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Invalid token",
      });
    }

    // ✅ Attach userId to request
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized - Token expired or invalid",
    });
  }
};

module.exports = userAuth;
