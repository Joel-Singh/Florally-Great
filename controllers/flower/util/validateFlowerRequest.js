const asyncHandler = require("express-async-handler");
const path = require("path");
const Flower = require(path.join(appRoot, "models", "flower.js"));
const Region = require(path.join(appRoot, "models", "region.js"));
const { body } = require("express-validator");

const regionExistsValidation = asyncHandler(
  body("regionID").custom(async (regionID) => {
    const regionDocsWithIDs = await Region.find({}, "_id").exec();
    const regionIDArray = regionDocsWithIDs.map((doc) => doc._id.toString());

    if (!regionIDArray.includes(regionID))
      throw new Error("Region does not exist");
  })
);

const checkDuplicateFlower = asyncHandler(
  body("name").custom(async (name) => {
    const foundFlower = await Flower.findOne({ name }).exec();
    if (foundFlower !== null) {
      throw new Error("Flower with that name already exists");
    }
  })
);

module.exports = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .withMessage(`Name can't be empty`)
    .escape(),

  body("description")
    .trim()
    .isLength({ min: 1 })
    .withMessage(`Description can't be empty`)
    .escape(),

  body("numberInStock")
    .trim()
    .isLength({ min: 1 })
    .withMessage(`Number in stock can't be empty`)
    .isNumeric()
    .withMessage("Number in stock needs to be a number"),

  body("price")
    .trim()
    .isLength({ min: 1 })
    .withMessage(`Price can't be empty`)
    .matches(/\$[0-9]+\.[0-9][0-9]/)
    .withMessage("Price needs to be in $x.xx format, e.g $3.86 or $287.00"),

  regionExistsValidation,
  checkDuplicateFlower,
];
