import asyncHandler from "express-async-handler";
import Flower from "../../models/flower";
import getFlowerModelDataFromReqBody from "./util/getFlowerModelDataFromReqBody";
import { RequestHandler } from "express";
import { RequestWithFlowerData } from "../types/flowerFormData";

const updateFlowerHandler: RequestHandler = async (
  req: RequestWithFlowerData,
  res,
  next
) => {
  const flowerId: string = req.body.id!;

  const update = getFlowerModelDataFromReqBody(req);

  await Flower.findByIdAndUpdate(flowerId, update);
  res.send("Update successful");
};

export default asyncHandler(updateFlowerHandler as any);
