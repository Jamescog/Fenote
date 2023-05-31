const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Certificate = sequelize.define("Certificate", {
  certificate_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  certificate_date: {
    type: DataTypes.DATEONLY,
  },
  student_id: {
    type: DataTypes.INTEGER,
  },
  course_id: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Certificate;
