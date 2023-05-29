const { DataTypes, Op } = require("sequelize");
const sequelize = require("../db");

/**
 * Represents the "BlacklistedToken" model.
 */

const BlacklistedToken = sequelize.define(
  "BlacklistedToken",
  {
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = BlacklistedToken;
