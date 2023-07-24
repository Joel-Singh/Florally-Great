const asyncHandler = require("express-async-handler");
const { default: Flower } = require("./../../models/flower.ts");
const {
  default: getFlowerModelDataFromReqBody,
} = require("./util/getFlowerModelDataFromReqBody.ts");

module.exports = asyncHandler(async (req, res, next) => {
  const flowerId = req.body.id;

  let update = getFlowerModelDataFromReqBody(req);

  await Flower.findByIdAndUpdate(flowerId, update);
  res.send("Update successful");
});
