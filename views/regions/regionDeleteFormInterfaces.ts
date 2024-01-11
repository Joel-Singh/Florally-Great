import { Request } from "express";
import typeFromKeys from "../typeFromKeys";
import formLocals from "../FormLocals";

export const regionFormKeys = ["regionId"] as const;

export type RegionDeleteFormData = typeFromKeys<typeof regionFormKeys>;
export interface RequestWithRegionDeleteFormData extends Request {
  body: RegionDeleteFormData;
}
