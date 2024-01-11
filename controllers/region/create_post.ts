import { Response } from "express";
import Region, {
  IRegionDocument,
  IRegionProperties,
} from "../../models/region";
import getCreatePostMiddleware from "../template/create_post";
import {
  RegionFormLocals,
  RequestWithRegionFormData,
} from "../../views/regions/regionUpdateAndCreateFormInterfaces";
import validation from "./validation";

function renderForm(res: Response, locals: RegionFormLocals) {
  res.render("regions/region_form", {
    ...locals,
  });
}

function getModelDataFromReqBody(
  req: RequestWithRegionFormData
): IRegionProperties {
  const { name, description } = req.body;
  return { name, description };
}

function getPreviousDataFromReqBody(
  req: RequestWithRegionFormData
): IRegionProperties {
  const { name, description } = req.body;
  return { name, description };
}

async function saveDocument(properties: IRegionProperties) {
  const region: IRegionDocument = new Region(properties);
  await region.save();
  return region;
}

export default getCreatePostMiddleware(
  validation,
  renderForm,
  getModelDataFromReqBody,
  getPreviousDataFromReqBody,
  saveDocument
);
