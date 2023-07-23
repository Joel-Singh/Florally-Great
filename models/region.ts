import mongoose, { Schema, Document } from "mongoose";

interface IRegion extends Document {
  name: string;
  description: string;
  url: string;
}

const regionSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

regionSchema.virtual("url").get(function (this: IRegion) {
  return `/regions/${this.name}`;
});

const RegionModel = mongoose.model<IRegion>("Region", regionSchema);

export default RegionModel;
