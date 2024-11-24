const express = require('express');
const { createUser } = require('../controllers/userController');

//Router object
//Used for segregating routes in different modules
const userRouter = express.Router();

userRouter.post('/',createUser);//This is a route registeration
// userRouter.get('/',getUsers);

module.exports = userRouter;