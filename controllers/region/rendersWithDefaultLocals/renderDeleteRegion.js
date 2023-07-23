const path = require("path");
const { default: Region } = require(path.join(appRoot, "models", "region.ts"));

module.exports = async (res, locals) => {
  const allRegions = await Region.find({}, "name").exec();

  res.render("regions/delete_region", {
    all_regions: allRegions,
    ...locals,
  });
};
