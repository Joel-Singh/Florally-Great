const asyncHandler = require("express-async-handler");
const renderFlowerForm = require("./rendersWithDefaultLocals/renderFlowerForm");
const Flower = require("./../../models/flower.js");

module.exports = asyncHandler(async (req, res, next) => {
  const flowerName = req.params.name;
  let flower = await Flower.findOne({ name: flowerName })
    .populate("region", "name")
    .exec();

  if (flower === null) {
    res.render("message", { title: `${flowerName} couldn't be found` });
    return;
  }

  const { name, description, numberInStock, price } = flower;
  await renderFlowerForm(res, next, {
    prepopulatedValues: {
      name,
      description,
      numberInStock,
      price: "$" + price,
      regionName: flower.region.name,
    },
  });
});
