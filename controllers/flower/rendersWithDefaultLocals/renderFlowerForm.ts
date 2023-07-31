import asyncHandler from "express-async-handler";
import Region from "../../../models/region";
import { Response } from "express";
import { ValidationError } from "express-validator";

export default asyncHandler(async function (
  res: Response,
  viewContext: {
    errors?: ValidationError[];
    prepopulatedValues?: {
      name: string;
      description: string;
      numberInStock: string;
      price: string;
      regionName: string;
      id: string;
    };
  },
  options: { isUpdate?: boolean } = {}
) {
  const allRegionNames = await Region.find({}, "name").exec();

  const formToRender = options.isUpdate
    ? "flowers/flower_form_update"
    : "flowers/flower_form";

  res.render(formToRender, {
    ...viewContext,
    regionList: allRegionNames,
  });
} as any);
