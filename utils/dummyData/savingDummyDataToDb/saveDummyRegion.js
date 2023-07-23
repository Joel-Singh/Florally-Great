const path = require("path");
const { default: Region } = require(path.join(appRoot, "models", "region.ts"));
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
