// Middleware for authentication
const jwt = require("jsonwebtoken");
const AuthMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
if (token) {
    const decode = jwt.verify(token, "loginornot");
    req.body.userId = decode.userId;
    if (decode) {
      next();
    }
  } else {
    res.send("you are not authorized");
  }
};
module.exports = {
  AuthMiddleware,
};
