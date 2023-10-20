import mongoose, { ObjectId, Schema } from "mongoose";
import { Document, Properties, setURLVirtual } from "./modelTemplate";

const schemaObj = {
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  numberInStock: { type: Number, required: true },
  region: { type: Schema.Types.ObjectId, ref: "Region", required: true },
};

export type IFlowerProperties = Properties<typeof schemaObj>;
export type IFlowerDocument = Document<typeof schemaObj, { url: string }>;
const flowerSchema: Schema = new Schema(schemaObj);

setURLVirtual(flowerSchema, "flowers");

const FlowerModel = mongoose.model<IFlowerDocument>("Flower", flowerSchema);
export default FlowerModel;
