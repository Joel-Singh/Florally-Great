const path = require("path");
const Flower = require(path.join(appRoot, "models", "flower.js"));
const Region = require(path.join(appRoot, "models", "region.js"));

exports.saveDummyFlower = async function (regionId, overwrites) {
  const dummyData = {
    name: "name",
    description: "description",
    price: 32,
    numberInStock: 21,
    region: regionId,
    ...overwrites,
  };
  await new Flower(dummyData).save();
};

exports.saveDummyRegion = async function (overwrites) {
  const dummyData = {
    name: "name",
    description: "descriptoin",
    ...overwrites,
  };
  await new Region(dummyData).save();
};
