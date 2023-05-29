const express = require("express");
const { passwordHasher } = require("../middlewares/password_hasher");
const { verifyToken } = require("../middlewares/verifyToken");
const {
  createUser,
  loginUser,
  logoutUser,
  confrimUser,
  resetPasswordRequest,
  approvedReset,
} = require("../controllers/users.Contorller");
const userRouter = express.Router();

userRouter.post("/register", passwordHasher, createUser);
userRouter.get("/confirm", confrimUser);
userRouter.post("/login", loginUser);
userRouter.post("/requestreset", resetPasswordRequest);
userRouter.post("/logout", verifyToken, logoutUser);
userRouter.post("/verifiedreset", passwordHasher, approvedReset);

module.exports = userRouter;
