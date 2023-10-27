import { Request } from "express";

export const regionFormKeys = ["name", "description"] as const;
export type RegionFormData = {
  [K in (typeof regionFormKeys)[number]]: string;
};

export interface RequestWithRegionFormData extends Request {
  body: FlowerFormData;
}
