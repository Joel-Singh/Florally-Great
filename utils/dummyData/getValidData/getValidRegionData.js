const {
  generateSequentialNumber,
  generateSequentialObjectId,
} = require("../SequentialGenerators.ts");

function getValidRegionData(overwrites = {}) {
  return {
    name: "Name" + generateSequentialNumber(),
    description: "Description",
    _id: generateSequentialObjectId(),
    ...overwrites,
  };
}

module.exports = getValidRegionData;
