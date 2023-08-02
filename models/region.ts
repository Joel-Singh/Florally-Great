import mongoose, { Schema, Document } from "mongoose";

export interface IRegionProperties {
  name: string;
  description: string;
  _id?: mongoose.Types.ObjectId;
}

export type IRegionDocument = Document & {
  url: string;
  _id: mongoose.Types.ObjectId;
} & IRegionProperties;

const regionSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

regionSchema.virtual("url").get(function (this: IRegionProperties) {
  return `/regions/${this.name}`;
});

const RegionModel = mongoose.model<IRegionDocument>("Region", regionSchema);

export default RegionModel;
