import asyncHandler from "express-async-handler";

export default asyncHandler(async (req, res, next) => {
  // @ts-ignore
  res.render("regions/region_form");
});
