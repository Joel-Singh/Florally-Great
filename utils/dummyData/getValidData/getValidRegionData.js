const {
  generateSequentialNumber,
  generateSequentialObjectId,
} = require("../SequentialGenerators.js");

function getValidRegionData(overwrites = {}) {
  return {
    name: "Name" + generateSequentialNumber(),
    description: "Description",
    _id: generateSequentialObjectId(),
    ...overwrites,
  };
}

module.exports = getValidRegionData;
