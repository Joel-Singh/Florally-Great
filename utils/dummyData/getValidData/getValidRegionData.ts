import mongoose from "mongoose";
import { IRegionProperties } from "../../../models/region";
import {
  generateSequentialNumber,
  generateSequentialObjectId,
} from "../SequentialGenerators";

export default function getValidRegionData(
  overwrites: Partial<IRegionProperties> = {}
): IRegionProperties {
  return {
    name: "Name" + generateSequentialNumber(),
    description: "Description",
    _id: new mongoose.Types.ObjectId(generateSequentialObjectId()),
    ...overwrites,
  };
}
