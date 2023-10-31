import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import Region, { IRegionDocument } from "../../models/region";

export default [
  body("name", `Name can't be empty`).trim().isLength({ min: 1 }).escape(),

  body("description", `Description can't be empty`)
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // @ts-ignore
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("regions/region_form", {
        errors: errors.array(),
      });
      return;
    } else {
      const { name, description } = req.body;
      const regionExists = await Region.findOne({ name }).exec();

      if (regionExists) {
        res.render("regions/region_form", {
          errors: [{ msg: "Region already exists" }],
        });
      } else {
        const region: IRegionDocument = new Region({ name, description });
        await region.save();
        res.redirect(region.url);
      }
    }
  }),
];
