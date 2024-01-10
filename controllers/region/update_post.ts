import { RequestHandler, Response } from "express";
import validation from "./validation";
import { ValidationError, validationResult } from "express-validator";
import {
  RegionUpdateFormLocals,
  RequestWithRegionUpdateFormData,
} from "../../views/regions/regionFormInterfaces";
import Region from "../../models/region";

const updateRegionHandler: RequestHandler = async (
  req: RequestWithRegionUpdateFormData,
  res,
  next
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const { id, name, description } = req.body;
    const viewContext: RegionUpdateFormLocals = {
      errors: errors.array(),
      prepopulatedValues: {
        id,
        name,
        description,
      },
    };

    res.render("regions/region_form_update", viewContext);
  } else {
    const { id, name, description } = req.body;
    const update = { name, description };

    await Region.findByIdAndUpdate(id, update);
    const updatedUrl = (await Region.findById(id))!.url;
    res.redirect(updatedUrl);
  }
};

export default [validation, updateRegionHandler];
