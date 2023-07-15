const path = require("path");
const Flower = require(path.join(appRoot, "models", "flower.js"));

const {
  getValidFlowerModelData,
} = require("../getValidData/getValidFlowerData.js");

module.exports = async function (overwrites = {}) {
  const dummyData = {
    ...(await getValidFlowerModelData()),
    ...overwrites,
  };

  return await new Flower(dummyData).save();
};
