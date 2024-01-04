import { Request } from "express";
import typeFromKeys from "../typeFromKeys";
import formLocals from "../FormLocals";

export const regionFormKeys = ["name", "description"] as const;
export type RegionFormData = typeFromKeys<typeof regionFormKeys>;
export interface RequestWithRegionFormData extends Request {
  body: RegionFormData;
}
export interface RegionFormLocals extends formLocals {
  prepopulatedValues: typeFromKeys<typeof regionFormKeys>
}
