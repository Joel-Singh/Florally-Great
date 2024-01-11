import asyncHandler from "express-async-handler";
import Flower from "../../models/flower";
import getFlowerModelDataFromReqBody from "./util/getFlowerModelDataFromReqBody";
import { RequestHandler, Response } from "express";
import {
  FlowerUpdateFormLocals,
  RequestWithFlowerFormData,
  RequestWithFlowerUpdateFormData,
  flowerUpdateFormKeys,
} from "../../views/flowers/flowerFormInterfaces";
import { validationResult } from "express-validator";
import renderFlowerForm from "./rendersWithDefaultLocals/renderFlowerForm";
import validateFlowerRequest from "./util/validateFlowerRequest";
import getDecodedFormValues from "../template/getDecodedFormValues";

const updateFlowerHandler: RequestHandler = async (
  req: RequestWithFlowerUpdateFormData,
  res,
  next
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const locals: FlowerUpdateFormLocals = {
      errors: errors.array(),
      prepopulatedValues: getDecodedFormValues(req, flowerUpdateFormKeys),
    };

    await renderFlowerForm(res, locals, { isUpdate: true });
  } else {
    await updateAndRedirect(req, res);
  }
};

async function updateAndRedirect(
  req: RequestWithFlowerUpdateFormData,
  res: Response
) {
  const flowerId: string = req.body.id!;
  const update = getFlowerModelDataFromReqBody(req);

  await Flower.findByIdAndUpdate(flowerId, update);
  const updatedFlowerUrl = (await Flower.findById(flowerId))!.url;
  res.redirect(updatedFlowerUrl);
}

export default [validateFlowerRequest, updateFlowerHandler];
