const express = require('express');
const { singIn, login } = require('../controlers/userControler');

const userRouter = express.Router();

userRouter.post('/singIn', singIn);
userRouter.post('/login', login);

module.exports = userRouter;