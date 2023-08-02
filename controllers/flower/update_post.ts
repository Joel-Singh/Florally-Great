import asyncHandler from "express-async-handler";
import Flower from "../../models/flower";
import getFlowerModelDataFromReqBody from "./util/getFlowerModelDataFromReqBody";
import { RequestHandler } from "express";
import { RequestWithFlowerFormData } from "../../views/flowers/flowerFormData";

const updateFlowerHandler: RequestHandler = async (
  req: RequestWithFlowerFormData,
  res,
  next
) => {
  const flowerId: string = req.body.id!;

  const update = getFlowerModelDataFromReqBody(req);

  await Flower.findByIdAndUpdate(flowerId, update);
  const updatedFlowerUrl = (await Flower.findById(flowerId))!.url;
  res.redirect(updatedFlowerUrl);
};

export default asyncHandler(updateFlowerHandler as any);
