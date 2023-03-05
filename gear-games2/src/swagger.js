const path = require("path");
const fs = require("fs");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const swagger = (app) => {
  fs.readdir(
    `${path.join(__dirname, "/routes")}`,
    { withFileTypes: true },
    (error, files) => {
      if (error) throw error;
      const directoriesInDIrectory = files
        .filter((item) => item.isDirectory())
        .map((item) => item.name);

      const directoriesAllRoutes = directoriesInDIrectory.map(
        (file) => `${path.join(__dirname, `/routes/${file}/index.js`)}`
      );

      const swaggerSpec = {
        definition: {
          openapi: "3.0.0",
          info: {
            title: "Node Swagger Gear Games",
            version: "1.0.0",
          },
          servers: [
            {
              url: "http://localhost:3000",
            },
          ],
        },
        apis: directoriesAllRoutes,
      };

      app.use(
        "/api-docs",
        swaggerUI.serve,
        swaggerUI.setup(swaggerJsDoc(swaggerSpec))
      );
    }
  );
};

module.exports = swagger;
