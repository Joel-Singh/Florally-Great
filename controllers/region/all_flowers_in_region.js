const asyncHandler = require("express-async-handler");
const path = require("path");
const Flower = require(path.join(appRoot, "models", "flower.js"));
const Region = require(path.join(appRoot, "models", "region.js"));

module.exports = asyncHandler(async (req, res, next) => {
  const regionName = req.params.name;
  let region = await Region.findOne({ name: regionName }).exec();

  let flowersInRegion = await Flower.find({ region: region._id });

  res.render("regions/all_flowers_in_region", {
    region,
    flower_list: flowersInRegion,
  });
});
