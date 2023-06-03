const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Course = sequelize.define("Course", {
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
  status: {
    type: DataTypes.ENUM("underconstruction", "pending", "approved"),
    defaultValue: "underconstruction",
  },
  author_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Course;
