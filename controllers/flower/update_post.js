const asyncHandler = require("express-async-handler");
const Flower = require("./../../models/flower.js");
const getFlowerModelDataFromReqBody = require("./util/getFlowerModelDataFromReqBody.js");

module.exports = asyncHandler(async (req, res, next) => {
  const filter = { id: req.body.id };

  let update = getFlowerModelDataFromReqBody(req);

  await Flower.updateOne(filter, update);
  res.send("Update successful");
});
