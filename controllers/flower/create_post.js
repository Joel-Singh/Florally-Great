const asyncHandler = require("express-async-handler");
const path = require("path");
const he = require("he");
const Flower = require(path.join(appRoot, "models", "flower.js"));
const renderFlowerForm = require("./rendersWithDefaultLocals/renderFlowerForm.js");
const validateFlowerRequest = require("./util/validateFlowerRequest.js");

const { validationResult } = require("express-validator");

module.exports = [
  validateFlowerRequest,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      await renderFlowerForm(res, { errors: errors.array() });
    } else {
      const flower = await saveFlower(req);
      res.redirect(flower.url);
    }
  }),
];

async function saveFlower(req) {
  const { name, description, price, numberInStock, regionID } = req.body;
  const priceToNumber = parseFloat(price.slice(1));

  const convertedName = he.decode(name);
  const convertedDescription = he.decode(description);

  const flower = new Flower({
    name: convertedName,
    description: convertedDescription,
    price: priceToNumber,
    numberInStock,
    region: regionID,
  });
  await flower.save();
  return flower;
}
