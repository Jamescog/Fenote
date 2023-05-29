const express = require("express");
const { passwordHasher } = require("../middlewares/password_hasher");
const { verifyToken } = require("../middlewares/verifyToken");
const {
  createUser,
  loginUser,
  logoutUser,
  confrimUser,
  resetPasswordRequest,
} = require("../controllers/users");
const userRouter = express.Router();

userRouter.post("/register", passwordHasher, createUser);
userRouter.get("/confirm", confrimUser);
userRouter.post("/login", loginUser);
userRouter.post("/requestreset", resetPasswordRequest);
userRouter.post("/logout", verifyToken, logoutUser);

module.exports = userRouter;
