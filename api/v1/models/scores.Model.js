const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Score = sequelize.define("Score", {
  score_id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER, // Use "type" instead of "dataType" here.
  },
  score: { type: DataTypes.INTEGER },
  project_id: { type: DataTypes.INTEGER },
  student_id: { type: DataTypes.INTEGER },
});

module.exports = Score;
