const asyncHandler = require("express-async-handler");
const {
  default: renderFlowerForm,
} = require("./rendersWithDefaultLocals/renderFlowerForm.ts");

module.exports = asyncHandler(async (req, res, next) => {
  await renderFlowerForm(res);
});
