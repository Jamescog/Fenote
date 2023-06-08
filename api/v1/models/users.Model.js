const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  full_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  type: {
    type: DataTypes.ENUM("admin", "author", "student"),
    allowNull: false,
  },
  confirmed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = User;
