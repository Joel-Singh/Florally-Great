import validateFlowerRequest from "./util/validateFlowerRequest";
import renderFlowerForm from "./rendersWithDefaultLocals/renderFlowerForm";
import getFlowerModelDataFromReqBody from "./util/getFlowerModelDataFromReqBody";
import Flower, { IFlowerProperties } from "../../models/flower";
import getCreatePostMiddleware from "../template/create_post";

async function saveFlower(flowerProperties: IFlowerProperties) {
  const flower = new Flower(flowerProperties);
  await flower.save();
  return flower;
}

export default getCreatePostMiddleware(
  validateFlowerRequest,
  renderFlowerForm,
  getFlowerModelDataFromReqBody,
  saveFlower
);
