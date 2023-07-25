// @ts-ignore
import indexRouter from "../routes/index";
// @ts-ignore
import usersRouter from "../routes/users";
// @ts-ignore
import flowersRouter from "../routes/flowers";
// @ts-ignore
import regionsRouter from "../routes/regions";

import { Express } from "express-serve-static-core";

export default function (app: Express) {
  app.use("/", indexRouter);
  app.use("/users", usersRouter);
  app.use("/flowers", flowersRouter);
  app.use("/regions", regionsRouter);
}
