const asyncHandler = require("express-async-handler");
const path = require("path");
const { default: Flower } = require(path.join(appRoot, "models", "flower.ts"));

module.exports = asyncHandler(async (req, res, next) => {
  const allFlowers = await Flower.find({}, "name description url")
    .sort({ name: 1 })
    .populate("region", "name")
    .exec();

  res.render("flowers/all_flowers", {
    flower_list: allFlowers,
    title: "All Flowers",
  });
});
