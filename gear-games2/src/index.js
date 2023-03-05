const express = require("express");
const middlewares = require("./routes");
const cors = require("cors");
const clienteDB = require("./database");
const migrateDatabase = require("./migrateDatabase");
// const swaggerUI = require("swagger-ui-express");
// const swaggerJsDoc = require("swagger-jsdoc");
// const path = require("path");
const swagger = require("./swagger");

const app = express();
const port = process.env.PORT || 3000;

// Response Json
app.use(express.json());

//CORS
app.get("/cors", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.send({ msg: "This has CORS enabled 🎈" });
});

app.use(
  cors({
    origin: "*",
  })
);

//Swagger
swagger(app);

// middlewares
middlewares(app);

// Database
clienteDB
  .connect()
  .then(() => {
    console.log("Database listening on port 5432");
  })
  .catch((error) => {
    console.error("database server crashed");
    console.error("error: ", error);
  })
  .finally(() => migrateDatabase());

// Listen
app.listen(port, () => console.log(`server listening on port ${port}`));
