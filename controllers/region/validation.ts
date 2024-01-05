import { body } from "express-validator";
export default [
  body("name", `Name can't be empty`).trim().isLength({ min: 1 }).escape(),
  body("description", `Description can't be empty`)
    .trim()
    .isLength({ min: 1 })
    .escape(),
];
