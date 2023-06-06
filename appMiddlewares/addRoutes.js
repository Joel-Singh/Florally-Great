const indexRouter = require("../routes/index");
const usersRouter = require("../routes/users");
const flowersRouter = require("../routes/flowers");
const regionsRouter = require("../routes/regions");

module.exports = function (app) {
  app.use("/", indexRouter);
  app.use("/users", usersRouter);
  app.use("/flowers", flowersRouter);
  app.use("/regions", regionsRouter);
};
