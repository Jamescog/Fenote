const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const SubmittedProject = sequelize.define("SubmittedProject", {
  project_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  project_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  student_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  project_link: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  afterDeadline: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  status: {
    type: DataTypes.ENUM("pending", "scored"),
    defaultValue: "pending",
  },
});

module.exports = SubmittedProject;
