const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/serverConfig");

async function isLoggedIn(req, res, next) {
    const token = req.cookies["authToken"];
  if (!token) {
    return res.status(401).json({
      success: false,
      data: {},
      error: "Not Authenticated",
      message: "No Auth Token provided",
    });
    }
    
    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded) {
        return res.status(401).json({
            success: false,
            data: {},
            error: "Invalid Token",
            message: "No Auth Token provided",
          });
    }

    req.user = {
        email: decoded.email,
        id: decoded.id
    }

    next();
}

module.exports = {
    isLoggedIn
}