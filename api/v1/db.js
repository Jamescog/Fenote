const dotenv = require("dotenv");
const Sequelize = require("sequelize");

dotenv.config({ path: ".env" });

const database = process.env.DB_NAME;
const username = process.env.DB_USER;
const dbhost = process.env.DB_HOST;
const password = process.env.DB_PASSWORD;

/**
 * Creates a Sequelize instance and establishes a connection to the database.
 */
const sequelize = new Sequelize(database, username, password, {
  host: dbhost,
  dialect: "mysql",
});

module.exports = sequelize;
