const express = require("express");
const { login } = require("../controllers/authController");

const authRouter = express.Router();

authRouter.post("/auth", login);

module.exports = authRouter;
