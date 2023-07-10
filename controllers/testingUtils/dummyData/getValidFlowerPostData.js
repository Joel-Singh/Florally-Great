const { saveDummyRegion } = require("./savingDummyDataToDb");
const { generateSequentialNumber } = require("./SequentialGenerators.js");

module.exports = async function () {
  return {
    name: "Name" + generateSequentialNumber(),
    description: "Description",
    numberInStock: 32,
    price: "$3.89",
    regionID: (await saveDummyRegion())._id.toString(),
  };
};
