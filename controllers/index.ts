import Region from "../models/region";
import Flower from "../models/flower";
import asyncHandler from "express-async-handler";

export default asyncHandler(async (req, res, next) => {
  const [flowerCount, regionCount] = await Promise.all([
    Flower.countDocuments({}).exec(),
    Region.countDocuments({}).exec(),
  ]);
  // @ts-ignore
  res.render("index", {
    title: "Florally Great",
    flower_count: flowerCount,
    region_count: regionCount,
  });
});
