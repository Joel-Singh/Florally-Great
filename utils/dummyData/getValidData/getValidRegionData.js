const {
  generateSequentialNumber,
  generateSequentialObjectId,
} = require("../SequentialGenerators.js");

function getValidRegionData() {
  return {
    name: "Name" + generateSequentialNumber(),
    description: "Description",
    _id: generateSequentialObjectId(),
  };
}

module.exports = getValidRegionData;
