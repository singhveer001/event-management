const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const adminAuthMiddleware = (asyncFn) => {
  return async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "Unauthorized: Missing or invalid token",
      });
    }

    try {
      const token = authHeader.split(" ")[1];

      const decoded = jwt.verify(token, JWT_SECRET_KEY);
      if (decoded) {
        req.adminId = decoded.adminId;
        await asyncFn(req, res, next);
      } else {
        return res.status(401).json({
          error: "Unauthorized: Invalid token format",
        });
      }
    } catch (err) {
      if (err.name === "JsonWebTokenError") {
        return res.status(401).json({
          error: "Unauthorized: Invalid token",
        });
      } else if (err.name === "TokenExpiredError") {
        return res.status(401).json({
          error: "Unauthorized: Token expired",
        });
      }

      return res.status(500).json({
        message: "Internal server error",
      });
    }
  };
};

module.exports = adminAuthMiddleware;
