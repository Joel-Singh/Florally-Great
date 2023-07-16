const asyncHandler = require("express-async-handler");
const renderFlowerForm = require("./rendersWithDefaultLocals/renderFlowerForm.js");

module.exports = asyncHandler(async (req, res, next) => {
  await renderFlowerForm(res, next);
});
