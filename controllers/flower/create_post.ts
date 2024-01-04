import validateFlowerRequest from "./util/validateFlowerRequest";
import renderFlowerForm from "./rendersWithDefaultLocals/renderFlowerForm";
import getFlowerModelDataFromReqBody from "./util/getFlowerModelDataFromReqBody";
import Flower, { IFlowerProperties } from "../../models/flower";
import getCreatePostMiddleware from "../template/create_post";
import {
  FlowerFormPrepopulatedValues,
  RequestWithFlowerFormData,
} from "../../views/flowers/flowerFormData";

async function saveFlower(flowerProperties: IFlowerProperties) {
  const flower = new Flower(flowerProperties);
  await flower.save();
  return flower;
}

function getPreviousDataFromReqBody(
  req: RequestWithFlowerFormData,
): FlowerFormPrepopulatedValues {
  const { name, description, price, regionID, numberInStock } = req.body;
  return {
    name,
    description,
    price,
    region: regionID.toString(),
    numberInStock,
  };
}

export default getCreatePostMiddleware(
  validateFlowerRequest,
  renderFlowerForm,
  getFlowerModelDataFromReqBody,
  getPreviousDataFromReqBody,
  saveFlower,
);
