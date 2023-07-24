import mongoose from "mongoose";
import FlowerFormData from "../../../controllers/types/flowerFormData";
import { IFlowerProperties } from "../../../models/flower";
import saveDummyRegion from "../savingDummyDataToDb/saveDummyRegion";
import {
  generateSequentialNumber,
  generateSequentialObjectId,
} from "../SequentialGenerators";

async function getValidFlowerPostData(): Promise<FlowerFormData> {
  return {
    name: "Name" + generateSequentialNumber(),
    description: "Description",
    numberInStock: "32",
    price: "$3.89",
    regionID: (await saveDummyRegion())._id.toString(),
    id: generateSequentialObjectId(),
  };
}

async function getValidFlowerModelData(): Promise<IFlowerProperties> {
  const postData = await getValidFlowerPostData();

  const modelData: IFlowerProperties = {
    name: postData.name,
    description: postData.description,
    numberInStock: 32,
    price: 3.89,
    region: new mongoose.Types.ObjectId(postData.regionID),
    _id: new mongoose.Types.ObjectId(postData.id!),
  };

  return modelData;
}

export { getValidFlowerPostData, getValidFlowerModelData };
