const asyncHandler = require("express-async-handler");
const path = require("path");
const { default: Region } = require(path.join(appRoot, "models", "region.ts"));

const { body, validationResult } = require("express-validator");

module.exports = [
  body("name", `Name can't be empty`).trim().isLength({ min: 1 }).escape(),

  body("description", `Description can't be empty`)
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
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
        const region = new Region({ name, description });
        await region.save();
        res.redirect(region.url);
      }
    }
  }),
];
