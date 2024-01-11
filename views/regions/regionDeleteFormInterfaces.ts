import { Request } from "express";

export type RegionDeleteFormData = {
  regionId: string;
  fromRegionDetailPage: "true" | undefined;
};

export interface RequestWithRegionDeleteFormData extends Request {
  body: RegionDeleteFormData;
}
