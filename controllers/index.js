const { default: Region } = require("../models/region");
const { default: Flower } = require("../models/flower");
const asyncHandler = require("express-async-handler");

module.exports = asyncHandler(async (req, res, next) => {
  const [flowerCount, regionCount] = await Promise.all([
    Flower.countDocuments({}).exec(),
    Region.countDocuments({}).exec(),
  ]);
  res.render("index", {
    title: "Florally Great",
    flower_count: flowerCount,
    region_count: regionCount,
  });
});
