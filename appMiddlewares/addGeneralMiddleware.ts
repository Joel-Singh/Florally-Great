import path from "path";
import logger from "morgan";
import express, { Express } from "express";
import cookieParser from "cookie-parser";

export default function (app: Express) {
  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static("public"));
}
