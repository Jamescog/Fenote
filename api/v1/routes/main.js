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
const mainRouter = express.Router();

mainRouter.post("/register", passwordHasher, createUser);
mainRouter.get("/confirm", confrimUser);
mainRouter.post("/login", loginUser);
mainRouter.post("/requestreset", resetPasswordRequest);
mainRouter.post("/logout", verifyToken, logoutUser);

module.exports = mainRouter;
