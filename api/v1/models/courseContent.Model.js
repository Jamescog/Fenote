const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const CourseContent = sequelize.define("CourseContent", {
  content_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  content_url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  content_order: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  week_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  course_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = CourseContent;
