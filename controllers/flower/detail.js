const asyncHandler = require("express-async-handler");
const path = require("path");
const Flower = require(path.join(appRoot, "models", "flower.js"));

module.exports = asyncHandler(async (req, res, next) => {
  const flowerName = req.params.name;
  let flower = await Flower.findOne({ name: flowerName })
    .populate("region", "name")
    .exec();

  const { name, description, price, numberInStock } = flower;
  res.render("flowers/flower_detail", {
    title: name,
    name,
    description,
    price,
    numberInStock,
    region: flower.region,
  });
});
