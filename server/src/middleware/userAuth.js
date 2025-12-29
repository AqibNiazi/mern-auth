const jwt = require("jsonwebtoken");

// First this middleware will run
// It will get the token from the cookies
// It will decode the token and add it in the request body
// Then it will verify the token
// If the token is valid, it will get the userId from the token
// Then it will pass the userId to the controller function
const userAuth = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json({ success: false, message: "Unauthorized - Login again" });
  }
  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode.id) {
      req.userId = tokenDecode.id;
    } else {
      return res.json({
        success: false,
        message: "Unauthorized - Login again",
      });
    }
    next(); // This will execute our controller function
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

module.exports = userAuth;
// By using this middleware and the controller function, we will create the api endpoints.
