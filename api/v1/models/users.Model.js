const { DataTypes } = require("sequelize");
const dbConfig = require("../db");
const Course = require("./courses.Model");

/**
 * Represents the "Course" model.
 */

const User = dbConfig.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
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

User.hasMany(Course, { as: "Courses", foreignKey: "course_id" });

module.exports = User;
