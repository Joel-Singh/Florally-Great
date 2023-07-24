import createError, { HttpError } from "http-errors";
import { Express, NextFunction, Response, Request } from "express";

export default function (app: Express) {
  app.use(function (req, res, next) {
    next(createError(404));
  });

  app.use(function (
    err: HttpError,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    res.status(err.status);
    res.render("error");
  });
}
