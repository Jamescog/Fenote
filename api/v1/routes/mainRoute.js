const express = require("express");
const userRouter = require("./userRoute");

mainRouter = express.Router();

mainRouter.use("/users", userRouter);

module.exports = mainRouter;
