const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Project = sequelize.define("Project", {
  project_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  project_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  week_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  due_date: {
    type: DataTypes.DATE,
  },
  course_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Project;
