import { Request } from "express";

export interface RegionFormData {
  name: string;
  description: string;
}

export interface RequestWithRegionFormData extends Request {
  body: FlowerFormData;
}
