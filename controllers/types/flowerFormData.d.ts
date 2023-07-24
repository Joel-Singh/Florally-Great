import { Request } from "express";

export default interface FlowerFormData {
  name: string;
  description: string;
  numberInStock: string;
  price: string;
  regionID: string;
  id?: string;
}

export interface RequestWithFlowerData extends Request {
  body: FlowerFormData;
}
