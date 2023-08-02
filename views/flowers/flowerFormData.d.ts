import { Request } from "express";

export interface FlowerFormData {
  name: string;
  description: string;
  numberInStock: string;
  price: string;
  regionID: string;
}

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
