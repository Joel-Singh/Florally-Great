const asyncHandler = require("express-async-handler");
const renderDeleteRegion = require("./rendersWithDefaultLocals/renderDeleteRegion.js");

module.exports = asyncHandler(async (req, res, next) => {
  renderDeleteRegion(res);
});
