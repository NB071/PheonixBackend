require("dotenv").config();
const jwt = require("jsonwebtoken");

// Your jwt functions go here...
// Customize the payload according to your application

// Generate token
const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SIGN_KEY, { expiresIn: "24h" });
};

// Verify token
const verifyAccessToken = (req, res, token) => {
  return jwt.verify(token, process.env.JWT_SIGN_KEY, (err, decoded) => {
    if (err) {
      console.log(err);
      return false;
    } else {
      req.decoded = decoded;
      return true;
    }
  });
};

module.exports = {
  generateAccessToken,
  verifyAccessToken,
};
