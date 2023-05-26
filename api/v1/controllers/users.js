const User = require("../models/users");

exports.createUser = async (req, res) => {
  const { username, password, email, type } = req.body;

  const newUser = await User.create({ username, password, email, type });
  return res.status(201).json({
    success: true,
    message: "User registered successfully",
  });
};
