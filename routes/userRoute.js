
const { getAllUsers, updateUser, deleteUser } = require('../contrelloler/userController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const userRouter = require('express').Router();

userRouter.get("/users", authMiddleware, getAllUsers);
userRouter.put("/users/:userId", authMiddleware, updateUser);
userRouter.delete("/users/:userId", authMiddleware, deleteUser);

module.exports = userRouter;