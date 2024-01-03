import { Request } from "express";
import typeFromKeys from "../typeFromKeys";
import formLocals from "../formLocals";

export const flowerFormKeys = [
  "name",
  "description",
  "numberInStock",
  "price",
  "regionID",
] as const;

export type FlowerFormData = typeFromKeys<typeof flowerFormKeys>;
export type FlowerFormLocals = FlowerFormData & {
  prepopulatedValues: {
    name: string;
    description: string;
    numberInStock: string;
    price: string;
    region: string;
  };
} & formLocals;

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
