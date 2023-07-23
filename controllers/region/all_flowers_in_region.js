const asyncHandler = require("express-async-handler");
const path = require("path");
const { default: Flower } = require(path.join(appRoot, "models", "flower.ts"));
const { default: Region } = require(path.join(appRoot, "models", "region.ts"));

module.exports = asyncHandler(async (req, res, next) => {
  const regionName = req.params.name;
  let region = await Region.findOne({ name: regionName }).exec();

  let flowersInRegion = await Flower.find({ region: region._id });

  res.render("regions/all_flowers_in_region", {
    region,
    flower_list: flowersInRegion,
  });
});
