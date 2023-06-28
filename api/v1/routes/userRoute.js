/**
 * Express router for handling user-related routes.
 * @module routers/userRouter
 */

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
} = require("../controllers/auth.Contorller");

const userRouter = express.Router();

/**
 * Route for user registration.
 * @name POST /register
 * @function
 * @memberof module:routers/userRouter
 * @inner
 * @param {string} path - The route path.
 * @param {function[]} middlewares - The middlewares to be executed for this route.
 */
userRouter.post("/register", passwordHasher, createUser);

/**
 * Route for confirming user account.
 * @name GET /confirm
 * @function
 * @memberof module:routers/userRouter
 * @inner
 * @param {string} path - The route path.
 * @param {function[]} middlewares - The middlewares to be executed for this route.
 */
userRouter.get("/confirm", confrimUser);

/**
 * Route for user login.
 * @name POST /login
 * @function
 * @memberof module:routers/userRouter
 * @inner
 * @param {string} path - The route path.
 * @param {function[]} middlewares - The middlewares to be executed for this route.
 */
userRouter.post("/login", loginUser);

/**
 * Route for requesting password reset.
 * @name POST /requestreset
 * @function
 * @memberof module:routers/userRouter
 * @inner
 * @param {string} path - The route path.
 * @param {function[]} middlewares - The middlewares to be executed for this route.
 */
userRouter.post("/requestreset", resetPasswordRequest);

/**
 * Route for user logout.
 * @name POST /logout
 * @function
 * @memberof module:routers/userRouter
 * @inner
 * @param {string} path - The route path.
 * @param {function[]} middlewares - The middlewares to be executed for this route.
 */
userRouter.post("/logout", verifyToken, logoutUser);

/**
 * Route for approving password reset.
 * @name POST /verifiedreset
 * @function
 * @memberof module:routers/userRouter
 * @inner
 * @param {string} path - The route path.
 * @param {function[]} middlewares - The middlewares to be executed for this route.
 */
userRouter.post("/verifiedreset", passwordHasher, approvedReset);

module.exports = userRouter;
