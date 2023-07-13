const path = require("path");
const Flower = require(path.join(appRoot, "models", "flower.js"));
const { generateSequentialObjectId } = require("../SequentialGenerators.js");
const saveDummyRegion = require("./saveDummyRegion.js");

module.exports = async function (overwrites = {}) {
  const dummyData = {
    name: "name",
    description: "description",
    price: 32,
    numberInStock: 21,
    region: (await saveDummyRegion())._id,
    _id: generateSequentialObjectId(),
    ...overwrites,
  };

  return await new Flower(dummyData).save();
};
