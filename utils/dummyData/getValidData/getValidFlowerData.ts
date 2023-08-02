import mongoose from "mongoose";
import { IFlowerProperties } from "../../../models/flower";
import saveDummyRegion from "../savingDummyDataToDb/saveDummyRegion";
import {
  generateSequentialNumber,
  generateSequentialObjectId,
} from "../SequentialGenerators";
import {
  FlowerUpdateFormData,
  FlowerFormData,
} from "../../../views/flowers/flowerFormData";

async function getValidFlowerPostData(): Promise<FlowerFormData> {
  return {
    name: "Name" + generateSequentialNumber(),
    description: "Description",
    numberInStock: "32",
    price: "$3.89",
    regionID: (await saveDummyRegion())._id!.toString(),
  };
}

async function getValidFlowerUpdatePostData() {
  const regularPostData = await getValidFlowerPostData();
  const updatePostData: FlowerUpdateFormData = {
    ...regularPostData,
    id: generateSequentialObjectId(),
    isUpdate: "true",
  };
  return updatePostData;
}

async function getValidFlowerModelData(): Promise<IFlowerProperties> {
  const postData = await getValidFlowerUpdatePostData();

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
