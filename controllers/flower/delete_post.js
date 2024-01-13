const asyncHandler = require("express-async-handler");
const { default: Flower } = require("../../models/flower.ts");
module.exports = asyncHandler(async (req, res, next) => {
  const { flowerId } = req.body;
  await Flower.findByIdAndDelete(flowerId);
  const name = req.params.name;

  res.render("message", {
    title: `${name || "Flower"} deleted!`,
    message: `${name || "Flower"} deleted successfully`,
  });
});
