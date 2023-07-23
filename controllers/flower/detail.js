const asyncHandler = require("express-async-handler");
const path = require("path");
const { default: Flower } = require(path.join(appRoot, "models", "flower.ts"));
const with_flower_data = require("./with_flower_data.js");

module.exports = asyncHandler(
  with_flower_data((req, res, next, flower) => {
    const { name, description, price, numberInStock, _id } = flower;
    res.render("flowers/flower_detail", {
      title: name,
      name,
      description,
      price,
      numberInStock,
      flowerId: _id,
      flowerUrl: flower.url,
      region: flower.region,
    });
  })
);
