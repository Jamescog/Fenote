const express = require("express");
const userRouter = require("./userRoute");
const courseRouter = require("./courseRoute");

mainRouter = express.Router();

mainRouter.use("/users", userRouter);
mainRouter.use("/courses", courseRouter);

module.exports = mainRouter;
