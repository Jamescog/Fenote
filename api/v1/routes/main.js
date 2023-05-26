const express = require("express");
const { passwordHasher } = require("../middlewares/password_hasher");
const { createUser } = require("../controllers/users");
const mainRouter = express.Router();

mainRouter.post("/register", passwordHasher, createUser);

module.exports = mainRouter;
