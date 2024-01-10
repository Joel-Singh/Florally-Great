import asyncHandler from "express-async-handler";
import Region from "../../../models/region";
import { Response } from "express";
import { ValidationError } from "express-validator";
import { FlowerFormPrepopulatedValues } from "../../../views/flowers/flowerFormInterfaces";

export default asyncHandler(async function (
  res: Response,
  locals: {
    errors?: ValidationError[];
    prepopulatedValues?: FlowerFormPrepopulatedValues;
  },
  options: { isUpdate?: boolean } = {}
) {
  const allRegionNames = await Region.find({}, "name").exec();

  const formToRender = options.isUpdate
    ? "flowers/flower_form_update"
    : "flowers/flower_form";

  res.render(formToRender, {
    ...locals,
    regionList: allRegionNames,
  });
} as any);
