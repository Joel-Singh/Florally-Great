import { Request } from "express";

export const flowerFormKeys = [
  "name",
  "description",
  "numberInStock",
  "price",
  "regionID",
] as const;
export type FlowerFormData = {
  [K in (typeof flowerFormKeys)[number]]: string;
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
