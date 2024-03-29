import asyncHandler from "express-async-handler";
import Flower from "../../models/flower";
import Region from "../../models/region";
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import he from "he";

export default asyncHandler(
  // @ts-ignore
  async (req: Request, res: Response, next: NextFunction) => {
    const regionName = he.decode(req.params.name);
    let region = await Region.findOne({ name: he.decode(regionName) });

    if (region === null) {
      next(createHttpError(404));
    } else {
      let flowersInRegion = await Flower.find({ region: region._id });

      res.render("regions/all_flowers_in_region", {
        region,
        flower_list: flowersInRegion,
      });
    }
  }
);
