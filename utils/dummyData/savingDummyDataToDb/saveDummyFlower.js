const path = require("path");
const { default: Flower} = require(path.join(appRoot, "models", "flower.ts"));

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
