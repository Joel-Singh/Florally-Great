import he from "he";
import { IFlowerProperties } from "../../../models/flower";
import mongoose from "mongoose";
import { flowerFormKeys } from "../../../views/flowers/flowerFormData";
import getDecodedFormValues from "../../template/getDecodedFormValues";
import { Request } from "express";

export default function (req: Request) {
  const { name, description, price, numberInStock, regionID } =
    getDecodedFormValues<typeof flowerFormKeys>(req, flowerFormKeys);

  const priceToNumber = parseFloat(price.slice(1));

  const modelData: IFlowerProperties = {
    name,
    description,
    price: priceToNumber,
    numberInStock: parseInt(numberInStock),
    region: new mongoose.Types.ObjectId(regionID),
  };

  return modelData;
}
