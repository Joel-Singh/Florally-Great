import { Request } from "express";
import typeFromKeys from "../typeFromKeys";
import formLocals from "../FormLocals";
import { ObjectId } from "mongoose";
import { IRegionProperties } from "../../models/region";

export const flowerFormKeys = [
  "name",
  "description",
  "numberInStock",
  "price",
  "regionID",
] as const;

export type FlowerFormData = typeFromKeys<typeof flowerFormKeys>;
export type FlowerFormPrepopulatedValues = {
  name?: string;
  description?: string;
  numberInStock?: string;
  price?: string;
  region?: string;
};

export type FlowerFormLocals = formLocals & {
  regionList?: IRegionProperties[];
  prepopulatedValues?: FlowerFormPrepopulatedValues;
};

export type FlowerUpdateFormLocals = formLocals & {
  regionList?: IRegionProperties[];
  prepopulatedValues?: FlowerFormPrepopulatedValues & { id: string };
};

export interface FlowerUpdateFormData extends FlowerFormData {
  id: string;
  isUpdate: "true";
}

export interface RequestWithFlowerFormData extends Request {
  body: FlowerFormData;
}

export interface RequestWithFlowerUpdateFormData extends Request {
  body: FlowerUpdateFormData;
}
