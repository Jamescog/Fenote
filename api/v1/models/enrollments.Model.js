const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Enrollment = sequelize.define("Enrollment", {
  enrollment_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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

module.exports = Enrollment;
