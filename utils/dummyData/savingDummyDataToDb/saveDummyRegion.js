const path = require("path");
const Region = require(path.join(appRoot, "models", "region.js"));
const {
  generateSequentialObjectId,
  generateSequentialNumber,
} = require("../SequentialGenerators.js");

module.exports = async function (overwrites = {}) {
  const dummyData = {
    name: "name" + generateSequentialNumber(),
    description: "description",
    _id: generateSequentialObjectId(),
    ...overwrites,
  };
  return await new Region(dummyData).save();
};
