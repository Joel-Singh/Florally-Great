import asyncHandler from "express-async-handler";
import validateFlowerRequest from "./util/validateFlowerRequest";
import { validationResult } from "express-validator";
import renderFlowerForm from "./rendersWithDefaultLocals/renderFlowerForm";
import getFlowerModelDataFromReqBody from "./util/getFlowerModelDataFromReqBody";
import Flower from "../../models/flower";
import { RequestWithFlowerFormData } from "../../views/flowers/flowerFormData";
import { RequestHandler } from "express";

const create_post: RequestHandler = async function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    await renderFlowerForm(res, { errors: errors.array() });
  } else {
    const flower = await saveFlower(req);
    res.redirect(flower.url);
  }
};

export default [validateFlowerRequest, asyncHandler(create_post as any)];

async function saveFlower(req: RequestWithFlowerFormData) {
  const flower = new Flower(getFlowerModelDataFromReqBody(req));
  await flower.save();
  return flower;
}
