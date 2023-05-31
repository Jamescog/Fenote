const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Review = sequelize.define("Review", {
  review_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  review_text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  student_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  course_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Review;
