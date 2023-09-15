// Middleware for authentication 
const jwt = require("jsonwebtoken");
const AuthMiddleware = (req, res, next) => {
  const token = req.headers.auth;
  // console.log("i am token", token);
  if (token) {
    const decode = jwt.verify(token, "loginornot");
    req.body.userId=decode.UserId
    // console.log("i am decode",decode)
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