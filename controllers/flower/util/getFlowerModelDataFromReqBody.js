const he = require("he");

module.exports = function (req) {
  const { name, description, price, numberInStock, regionID } = req.body;
  const priceToNumber = parseFloat(price.slice(1));

  const convertedName = he.decode(name);
  const convertedDescription = he.decode(description);
  const modelData = {
    name: convertedName,
    description: convertedDescription,
    price: priceToNumber,
    numberInStock,
    region: regionID,
  };

  return modelData;
};
