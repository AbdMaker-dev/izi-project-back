const express = require('express');
const { singIn, login, test } = require('../controlers/userControler');
const verifyToken = require('../middleware/auth');

const userRouter = express.Router();

userRouter.get('/', verifyToken, test);
userRouter.post('/singIn', singIn);
userRouter.post('/login', login);

module.exports = userRouter;