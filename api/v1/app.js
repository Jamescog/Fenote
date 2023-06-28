require("express-async-errors");
const express = require("express");
const dbConfig = require("./db");
const mainRouter = require("./routes/mainRoute");
const dotenv = require("dotenv");
const { errorHandler } = require('./middlewares/errorHandler')

const models = require("./models/relationships");

const app = express();
app.use(express.json());
dotenv.config({ path: ".env" });

/**
 * Starts the server by authenticating with the database, synchronizing the models,
 * and listening on the specified port.
 */
const startServer = async () => {
  await dbConfig.authenticate();
  console.log(`Connected to Database`);
  dbConfig.sync();

  app.use("/api/v1/", mainRouter);
  app.use(errorHandler)
  app.listen(process.env.PORT, () => {
    console.log(
      `The server is running at http://localhost:${process.env.PORT}`
    );
  });
};

startServer();
