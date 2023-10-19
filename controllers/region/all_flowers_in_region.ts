import asyncHandler from "express-async-handler";
import { join } from "path";
import Flower from "../../models/flower";
import Region from "../../models/region";

export default asyncHandler(async (req, res, next) => {
  const regionName = req.params.name;
  let region = await Region.findOne({ name: regionName });

  let flowersInRegion = await Flower.find({ region: region._id });

  res.render("regions/all_flowers_in_region", {
    region,
    flower_list: flowersInRegion,
  });
});
