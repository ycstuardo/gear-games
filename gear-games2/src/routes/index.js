const notesRoutes = require("./notes");

const middlewares = (app) => {
  app.use("/api", notesRoutes);
};

module.exports = middlewares;
