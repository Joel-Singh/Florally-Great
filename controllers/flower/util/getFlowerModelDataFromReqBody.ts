import he from "he";
import { RequestWithFlowerData } from "../../types/flowerFormData";
import { IFlowerProperties } from "../../../models/flower";
import mongoose from "mongoose";

export default function (req: RequestWithFlowerData) {
  const { name, description, price, numberInStock, regionID } = req.body;
  const priceToNumber = parseFloat(price.slice(1));

  const convertedName = he.decode(name);
  const convertedDescription = he.decode(description);
  const modelData: IFlowerProperties = {
    name: convertedName,
    description: convertedDescription,
    price: priceToNumber,
    numberInStock: parseInt(numberInStock),
    region: new mongoose.Types.ObjectId(regionID),
  };

  return modelData;
}