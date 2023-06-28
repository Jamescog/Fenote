const User = require("../models/users.Model");
const BlacklistedToken = require("../models/blacklist.Model");
const { confirmEmail, resetingRequest } = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

/**
 * Creates a new user.
 * @param {Object} req.body - The request body containing username, password, email, and type.
 * @returns {Object} The response object with a success message and status code.
 * @author Yaekob Demisse
 */

exports.createUser = async (req, res) => {
  const { username, password, email, type } = req.body;

  await User.create({ username, password, email, type });
  await confirmEmail(email);
  return res.status(201).json({
    success: true,
    message: "Confrimation email is sent",
  });
};

/**
 * Logs in a user.
 * @param {Object} req.body - The request body containing email and password.
 * @returns {Object} The response object with a success message, access token, and status code.
 * @throws {Error} If the provided password is incorrect or the user is not found.
 * @author Yaekob Demisse
 */

exports.loginUser = async (req, res) => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  await BlacklistedToken.destroy({
    where: {
      createdAt: {
        [Op.lt]: thirtyDaysAgo,
      },
    },
  });

  const { email, password } = req.body;
  const user = await User.findOne({
    where: { email },
  });
  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const accessToken = await jwt.sign({ user }, process.env.JWT_SECRET_KEY, {
        expiresIn: "7d",
      });
      res.status(200).json({
        success: true,
        message: `User logged in successfully`,
        accessToken,
      });
    } else {
      const err = Error(`Incorrect password`);
      err.status = 404;
      err.type = "custom";
      throw err;
    }
  } else {
    const err = Error(`User not Found`);
    err.status = 404;
    err.type = "custom";
    throw err;
  }
};

/**
 * Confirms a user's email address.
 * @param {Object} req.query - The query object containing the email parameter.
 * @returns {Object} The response object with a success message and status code.
 * @author Yaekob Demisse
 */

exports.confrimUser = async (req, res) => {
  const { email } = req.query;
  await User.update({ confirmed: true }, { where: { email } });
  res.status(200).json({
    success: true,
    message: `Email confirmed, proceed to logging in!`,
  });
};

/**
 * Logs out a user.
 * @param {Object} req.user - The user object containing the token.
 * @returns {Object} The response object with a success message and status code.
 * @author Yaekob Demisse
 */

exports.logoutUser = async (req, res) => {
  const { token } = req.user;
  await BlacklistedToken.create({ token });
  return res.status(200).json({
    success: true,
    message: `User Logged out successfully!`,
  });
};

/**
 * Sends a password reset request for a user.
 * @param {Object} req.body - The request body containing the email.
 * @returns {Object} The response object with a success message and status code.
 * @throws {Error} If a user with the provided email is not found.
 */

exports.resetPasswordRequest = async (req, res) => {
  const { email } = req.body;
  const user = User.findOne({ email });
  if (user) {
    await resetingRequest(email);
    return res.status(200).json({
      success: true,
      message: "Verfication email sent",
    });
  } else {
    const err = Error(`User with account is not found`);
    err.status = 404;
    err.type = "custom";
    throw err;
  }
};

/**
 * Updates a user's password based on the provided email.
 * @param {Object} req.body - The request body containing the email and new password.
 * @returns {Object} The response object with a success message and status code.
 * @author Yaekob Demisse
 */
exports.approvedReset = async (req, res) => {
  const { email, password } = req.body;

  await User.update({ password }, { where: { email } });

  return res.status(200).json({
    success: true,
    message: `Password changed successfully`,
  });
};
