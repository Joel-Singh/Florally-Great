const asyncHandler = require("express-async-handler");
const renderFlowerForm = require("./rendersWithDefaultLocals/renderFlowerForm");
const Flower = require("./../../models/flower.js");
const with_flower_data = require("./with_flower_data.js");

module.exports = asyncHandler(
  with_flower_data(async (req, res, next, flower) => {
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
  })
);
