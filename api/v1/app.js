const express = require("express");
const dbConfig = require("./db");
const mainRouter = require("./routes/main");
const dotenv = require("dotenv");

const app = express();
app.use(express.json());
dotenv.config({ path: ".env" });
const startServer = async () => {
  await dbConfig.authenticate();
  console.log(`Connected to Database`);
  dbConfig.sync();

  app.use("/api/v1/", mainRouter);
  app.listen(process.env.PORT, () => {
    console.log(
      `The server is running at http://localhost:${process.env.PORT}`
    );
    console.log(process.env.DB_NAME);
  });
};

startServer();
