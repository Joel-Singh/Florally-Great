const asyncHandler = require("express-async-handler");
const { default: Flower } = require("../../models/flower.ts");
module.exports = asyncHandler(async (req, res, next) => {
  const { flowerId } = req.body;
  await Flower.findByIdAndDelete(flowerId);

  res.render("message", {
    title: "Flower deleted!",
    message: "Flower deleted successfully",
  });
});
