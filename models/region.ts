import mongoose, { ObjectId, Schema } from "mongoose";
import { Document, Properties, setURLVirtual } from "./modelTemplate";

const schemaObj = {
  name: { type: String, required: true },
  description: { type: String, required: true },
};

export const regionKeys = Object.keys(schemaObj);
export type IRegionProperties = Properties<typeof schemaObj>;
export type IRegionDocument = Document<typeof schemaObj, { url: string }>;
const regionSchema: Schema = new Schema(schemaObj);

setURLVirtual(regionSchema, "regions");

const RegionModel = mongoose.model<IRegionDocument>("Region", regionSchema);
export default RegionModel;
