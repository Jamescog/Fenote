const User = require("../models/users");
const BlacklistedToken = require("../models/blacklist");
const jwt = require("jsonwebtoken");

/**
 * Middleware that verifies the access token in the request headers or cookies.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 * @author Yaekob Demisse
 */

exports.verifyToken = async (req, res, next) => {
  let token = null;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token && req.cookies.accessToken) {
    token = req.cookies.accessToken;
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  if (token) {
    const isRevoked = await BlacklistedToken.findOne({
      attributes: ["token"],
      where: { token },
    });
    if (isRevoked) {
      return res.status(401).json({
        success: false,
        message: `You're logged out, please login to get an acess`,
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const { email } = decoded;
    if (!(await User.findOne({ email }))) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    req.user = decoded;
    req.user.token = token;
    next();
  }
};
