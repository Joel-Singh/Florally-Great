import mongoose, { Schema } from "mongoose";
import CustomDocument from "./CustomDocument";

export interface IFlowerProperties {
  name: string;
  description: string;
  price: number;
  numberInStock: number;
  region: mongoose.Types.ObjectId;
  _id?: mongoose.Types.ObjectId;
}

export type IFlowerDocument = CustomDocument<
  IFlowerProperties,
  { url: string }
>;

const flowerSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  numberInStock: { type: Number, required: true },
  region: { type: Schema.Types.ObjectId, ref: "Region", required: true },
});

flowerSchema.virtual("url").get(function (this: IFlowerProperties) {
  return `/flowers/${this.name}`;
});

const FlowerModel = mongoose.model<IFlowerDocument>("Flower", flowerSchema);

export default FlowerModel;
