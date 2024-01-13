import { RequestHandler } from "express";
import Region from "../../models/region";
import { RegionUpdateFormLocals } from "../../views/regions/regionUpdateAndCreateFormInterfaces";
import he from "he";

const update_get: RequestHandler = async (req, res, next) => {
  const regionName = he.decode(req.params.name);
  const region = await Region.findOne({ name: regionName }).exec();

  if (region === null) {
    res.render("message", { title: `${regionName} couldn't be found` });
    return;
  }

  const locals: RegionUpdateFormLocals = {
    prepopulatedValues: {
      name: region.name,
      description: region.description,
      id: region._id.toString(),
    },
  };

  res.render("regions/region_form_update", {
    ...locals,
  });
};

export default update_get;
