const asyncHandler = require("express-async-handler");
const { default: Flower } = require("../../models/flower.ts");
const he = require("he");
module.exports = asyncHandler(async (req, res, next) => {
  const { flowerId } = req.body;
  await Flower.findByIdAndDelete(flowerId);
  const name = he.decode(req.params.name);

  res.render("message", {
    title: `${name || "Flower"} deleted!`,
    message: `${name || "Flower"} deleted successfully`,
  });
});
