// @ts-ignore
import viewEngineSetup from "./viewEngineSetup.ts";
import addGeneralMiddleware from "./addGeneralMiddleware";
import addRoutes from "./addRoutes";
import addErrorHandlingMiddleware from "./addErrorHandlingMiddleware";
import express from "express";

type options = "viewEngine" | "generalMiddleware" | "routes" | "errorHandling";

export default function (options: Record<options, boolean>) {
  const app = express();

  const { viewEngine, generalMiddleware, routes, errorHandling } = options;

  if (viewEngine) viewEngineSetup(app);

  if (generalMiddleware) addGeneralMiddleware(app);

  if (routes) addRoutes(app);

  if (errorHandling) addErrorHandlingMiddleware(app);

  return app;
}
