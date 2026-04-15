// 1st way to route
// const express = require('express');
// const signUpRoute = express.Router();

const { singup, login } = require('../../contrelloler/authController/auth');


// 2nd way to route
const authRouter = require('express').Router();

authRouter.post("/signup", singup);
authRouter.post("/login", login);

module.exports = authRouter;