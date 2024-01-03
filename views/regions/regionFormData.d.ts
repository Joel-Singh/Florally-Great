import { Request } from "express";
import typeFromKeys from "../typeFromKeys";

export const regionFormKeys = ["name", "description"] as const;
export type RegionFormData = typeFromKeys<typeof regionFormKeys>;
export interface RequestWithRegionFormData extends Request {
  body: RegionFormData;
}
