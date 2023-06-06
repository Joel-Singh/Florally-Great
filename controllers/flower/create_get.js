const asyncHandler = require("express-async-handler");
const path = require("path");
const Region = require(path.join(appRoot, "models", "region.js"));

module.exports = asyncHandler(async (req, res, next) => {
  const allRegions = await Region.find({}, "name").exec();
  res.render("flowers/flower_form", { regionList: allRegions });
});
