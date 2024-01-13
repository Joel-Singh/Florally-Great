import asyncHandler from "express-async-handler";
import Region from "../../models/region";

export default asyncHandler(async (req, res, next) => {
  const allRegions = await Region.find({}, "name description url")
    .sort({ name: 1 })
    .exec();

  // @ts-ignore
  res.render("regions/all_regions", {
    region_list: allRegions,
    title: "All Regions",
  });
});
