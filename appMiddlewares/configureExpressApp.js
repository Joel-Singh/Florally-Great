const viewEngineSetup = require("./viewEngineSetup.js");
const { default: addGeneralMiddleware } = require("./addGeneralMiddleware.ts");
const { default: addRoutes } = require("./addRoutes.ts");
const addErrorHandlingMiddleware = require("./addErrorHandlingMiddleware.ts");

const express = require("express");

module.exports = function (options) {
  const app = express();

  const { viewEngine, generalMiddleware, routes, errorHanding } = options;

  if (viewEngine) viewEngineSetup(app);

  if (generalMiddleware) addGeneralMiddleware(app);

  if (routes) addRoutes(app);

  if (errorHanding) addErrorHandlingMiddleware(app);

  return app;
};
