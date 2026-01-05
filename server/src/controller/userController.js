const User = require("../model/user");

const getUserData = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user) {
      // 404 Not Found
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // 200 OK
    res.status(200).json({
      success: true,
      userData: {
        name: user.name,
        isAccountVerified: user.isAccountVerified,
      },
    });
  } catch (error) {
    // 500 Internal Server Error
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = getUserData;
