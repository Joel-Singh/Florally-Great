import Region from "../../../models/region";

export default async (res, locals) => {
  const allRegions = await Region.find({}, "name").exec();

  res.render("regions/delete_region", {
    all_regions: allRegions,
    ...locals,
  });
};
