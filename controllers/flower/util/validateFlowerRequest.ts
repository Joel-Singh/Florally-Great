import Flower from "../../../models/flower";
import Region from "../../../models/region";
import { body } from "express-validator";
import {
  RequestWithFlowerFormData,
  RequestWithFlowerUpdateFormData,
} from "../../../views/flowers/flowerFormInterfaces";

const regionExistsValidation = body("regionID").custom(
  async (regionID: string) => {
    const regionDocsWithIDs = await Region.find({}, "_id").exec();
    const regionIDArray = regionDocsWithIDs.map((doc) => doc._id.toString());

    if (!regionIDArray.includes(regionID))
      throw new Error("Region does not exist");
  }
);

const checkDuplicateFlower = body("name").custom(async (name: string, meta) => {
  const flowerDuplicateError = new Error(
    "Flower with that name already exists"
  );
  const req = meta.req as
    | RequestWithFlowerFormData
    | RequestWithFlowerUpdateFormData;

  if ("isUpdate" in req.body) {
    await checkFlowerForUpdate(name, req as RequestWithFlowerUpdateFormData);
  } else {
    await checkFlowerForCreate(name);
  }

  async function checkFlowerForCreate(name: string) {
    const foundFlower = await Flower.findOne({ name }).exec();
    if (foundFlower !== null) {
      throw flowerDuplicateError;
    }
  }

  async function checkFlowerForUpdate(
    name: string,
    req: RequestWithFlowerUpdateFormData
  ) {
    const foundFlowers = await Flower.find({ name });
    const foundFlowersWithoutOriginal = foundFlowers.filter(
      (flower) => flower.id !== req.body.id
    );

    if (foundFlowersWithoutOriginal.length > 0) {
      throw flowerDuplicateError;
    }
  }
});

export default [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .withMessage(`Name can't be empty`)
    .escape(),
  body("name", `Name can't have the pound symbol`).not().matches(/#/, "g"),

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
    .matches(/^\$[0-9]+(\.[0-9]{1,2})?$/)
    .withMessage("Price needs to be in $x.xx format, e.g $3.86 or $287.00"),

  regionExistsValidation,
  checkDuplicateFlower,
];
