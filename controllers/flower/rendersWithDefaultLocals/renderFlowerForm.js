const path = require("path");
const asyncHandler = require("express-async-handler");
const { default: Region } = require(path.join(appRoot, "models", "region.ts"));

module.exports = asyncHandler(async function (res, viewContext, options = {}) {
  const allRegionNames = await Region.find({}, "name").exec();

  const formToRender = options.isUpdate
    ? "flowers/flower_form_update"
    : "flowers/flower_form";

  res.render(formToRender, {
    ...viewContext,
    regionList: allRegionNames,
  });
});
