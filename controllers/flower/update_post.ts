import asyncHandler from "express-async-handler";
import Flower from "../../models/flower";
import getFlowerModelDataFromReqBody from "./util/getFlowerModelDataFromReqBody";
import { RequestHandler, Response } from "express";
import {
  RequestWithFlowerFormData,
  RequestWithFlowerUpdateFormData,
} from "../../views/flowers/flowerFormInterfaces";
import { validationResult } from "express-validator";
import renderFlowerForm from "./rendersWithDefaultLocals/renderFlowerForm";
import validateFlowerRequest from "./util/validateFlowerRequest";

const updateFlowerHandler: RequestHandler = async (
  req: RequestWithFlowerUpdateFormData,
  res,
  next,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    await renderFlowerForm(res, { errors: errors.array() });
  } else {
    await updateAndRedirect(req, res);
  }
};

async function updateAndRedirect(
  req: RequestWithFlowerUpdateFormData,
  res: Response,
) {
  const flowerId: string = req.body.id!;
  const update = getFlowerModelDataFromReqBody(req);

  await Flower.findByIdAndUpdate(flowerId, update);
  const updatedFlowerUrl = (await Flower.findById(flowerId))!.url;
  res.redirect(updatedFlowerUrl);
}

export default [
  validateFlowerRequest,
  asyncHandler(updateFlowerHandler as any),
];
