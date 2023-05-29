const { DataTypes } = require("sequelize");
const dbConfig = require("../db");

/**
 * Represents the "Course" model.
 */

const Course = dbConfig.define("Course", {
  course_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  course_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  prerequisites: {
    type: DataTypes.TEXT,
  },
  skill_level: {
    type: DataTypes.ENUM("beginner", "intermediate", "advanced"),
    allowNull: false,
  },
  author_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

const User = require("./users.Model");
Course.belongsTo(User, { foreignKey: "author_id" });

module.exports = Course;
