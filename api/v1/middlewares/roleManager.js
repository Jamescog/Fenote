/**
 * This file contains middleware functions for user authorization based on user type.
 */

/**
 * Middleware for checking if the user is an author.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {undefined}
 */

exports.isAuthor = async (req, res, next) => {
  const type = req.user.user.type;
  if (type === "author") {
    next();
  } else {
    res
      .status(403)
      .json({ message: "You are not authorized to perform this action" });
  }
};

/**
 * Middleware for checking if the user is an admin.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {undefined}
 */

exports.isAdmin = async (req, res, next) => {
  const type = req.user.user.type;
  if (type === "admin") {
    next();
  } else {
    res
      .status(403)
      .json({ message: "You are not authorized to perform this action" });
  }
};

/**
 * Middleware for checking if the user is a student.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {undefined}
 */

exports.isStudent = async (req, res, next) => {
  const type = req.user.user.type;
  if (type === "student") {
    next();
  } else {
    res
      .status(403)
      .json({ message: "You are not authorized to perform this action" });
  }
};
