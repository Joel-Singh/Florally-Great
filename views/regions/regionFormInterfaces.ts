import { Request } from "express";
import typeFromKeys from "../typeFromKeys";
import formLocals from "../FormLocals";

export const regionFormKeys = ["name", "description"] as const;

export type RegionFormData = typeFromKeys<typeof regionFormKeys>;
export interface RegionUpdateFormData extends RegionFormData {
  id: string;
}

export interface RequestWithRegionFormData extends Request {
  body: RegionFormData;
}

export interface RequestWithRegionUpdateFormData extends Request {
  body: RegionUpdateFormData;
}

export interface RegionFormLocals extends formLocals {
  prepopulatedValues: typeFromKeys<typeof regionFormKeys>;
}

export interface RegionUpdateFormLocals extends RegionFormLocals {
  prepopulatedValues: RegionFormLocals["prepopulatedValues"] & {
    id: string;
  };
}
