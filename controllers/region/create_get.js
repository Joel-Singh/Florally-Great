const asyncHandler = require("express-async-handler");

module.exports = asyncHandler(async (req, res, next) => {
  res.render("regions/region_form");
});
