const asyncHandler = require("express-async-handler");
const Flower = require("./../../models/flower.js");
const he = require("he");

module.exports = asyncHandler(async (req, res, next) => {
  const filter = { id: req.body.id };

  const { name, description, price, numberInStock, regionID } = req.body;
  const priceToNumber = parseFloat(price.slice(1));

  const convertedName = he.decode(name);
  const convertedDescription = he.decode(description);

  let update = {
    name: convertedName,
    description: convertedDescription,
    price: priceToNumber,
    numberInStock,
    region: regionID,
  };

  await Flower.updateOne(filter, update);
  res.send("Update successful");
});
