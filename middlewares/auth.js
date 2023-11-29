const jwtUtils = require("../utils/jwt");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  const isAuthenticated = jwtUtils.verifyAccessToken(req, res, token.split(" ")[1]);
  if (isAuthenticated) {
    next();
  } else {
    return res.status(401).json({ message: "Invalid token" });
  }
}
module.exports = { authMiddleware };  
