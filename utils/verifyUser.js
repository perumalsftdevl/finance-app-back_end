const jwt = require("jsonwebtoken");
const errorHandler = require("./errorHandler.js");

const verifyUserToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new Error("Unauthorized: Token is missing or malformed"));
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    // Token is not present
    return next(errorHandler(401, "Unauthorized: Token not provided"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      // Token is present but not valid
      return next(errorHandler(401, "Unauthorized: Invalid token"));
    }

    // Token is valid, set user information on request
    req.user = user;
    next();
  });
};
module.exports = verifyUserToken;
