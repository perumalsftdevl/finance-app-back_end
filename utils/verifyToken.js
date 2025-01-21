const Jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new Error("Unauthorized: Token is missing or malformed"));
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return next(401, "UnAuthorized");
  }

  try {
    Jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return next(403, "Forbidden");
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyToken;
