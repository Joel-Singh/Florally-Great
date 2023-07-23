import mongoose, { Schema, Document, Model } from "mongoose";

interface IFlower extends Document {
  name: string;
  description: string;
  price: number;
  numberInStock: number;
  region: mongoose.Schema.Types.ObjectId;
  url: string;
}

const flowerSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  numberInStock: { type: Number, required: true },
  region: { type: Schema.Types.ObjectId, ref: "Region", required: true },
});

flowerSchema.virtual("url").get(function (this: IFlower) {
  return `/flowers/${this.name}`;
});

const FlowerModel = mongoose.model<IFlower>("Flower", flowerSchema);

export default FlowerModel;
