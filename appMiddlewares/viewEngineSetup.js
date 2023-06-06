const path = require("path");

module.exports = function (app) {
  app.set("views", path.join(appRoot, "views"));
  app.set("view engine", "pug");
};
