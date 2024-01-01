import { Request } from "express";
import typeFromStringTuple from "../typeFromStringTuple";

export const regionFormKeys = ["name", "description"] as const;
export type RegionFormData = typeFromStringTuple<typeof regionFormKeys>;
export interface RequestWithRegionFormData extends Request {
  body: RegionFormData;
}
