const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/serverConfig");
const UnAuthaurisedError = require("../utils/unauthorisedError");

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

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded) {
      throw new UnAuthaurisedError();
    }

    req.user = {
      email: decoded.email,
      id: decoded.id,
      role: decoded.role,
    };
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      data: {},
      error: "Invalid Token",
      message: "No Auth Token provided",
    });
  }
}

//this checks if user is admin or not
function isAdmin(req, res, next) {
  const loggedUser = req.user;
  if (isLoggedIn === "ADMIN") {
    next();
  } else {
    return res.status(401).json({
      success: false,
      data: {},
      message: "You are not authorized for this action",
      error: {
        statusCode: 401,
        reason: "Unauthaurised user for this action",
      },
    });
  }
}

module.exports = {
  isLoggedIn,
  isAdmin,
};
