import { Express } from "express-serve-static-core";

export default function (app: Express) {
  app.set("views", "views");
  app.set("view engine", "pug");
}
