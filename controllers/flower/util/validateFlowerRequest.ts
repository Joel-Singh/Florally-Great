import Flower from "../../../models/flower";
import Region from "../../../models/region";
import { body } from "express-validator";

const regionExistsValidation = body("regionID").custom(
  async (regionID: string) => {
    const regionDocsWithIDs = await Region.find({}, "_id").exec();
    const regionIDArray = regionDocsWithIDs.map((doc) => doc._id.toString());

    debugger;
    if (!regionIDArray.includes(regionID))
      throw new Error("Region does not exist");
  }
);

const checkDuplicateFlower = body("name").custom(async (name: string) => {
  const foundFlower = await Flower.findOne({ name }).exec();
  if (foundFlower !== null) {
    throw new Error("Flower with that name already exists");
  }
});

export default [
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
