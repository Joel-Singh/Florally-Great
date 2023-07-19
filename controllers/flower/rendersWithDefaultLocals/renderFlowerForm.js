const path = require("path");
const asyncHandler = require("express-async-handler");
const Region = require(path.join(appRoot, "models", "region.js"));

module.exports = asyncHandler(async function (
  res,
  next,
  viewContext,
  options = {}
) {
  const allRegionNames = await Region.find({}, "name").exec();

  const formToRender = options.isUpdate
    ? "flowers/flower_form_update"
    : "flowers/flower_form";

  res.render(formToRender, {
    ...viewContext,
    regionList: allRegionNames,
  });
});
