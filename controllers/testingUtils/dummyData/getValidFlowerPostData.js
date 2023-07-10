const { saveDummyRegion } = require("./savingDummyDataToDb");

module.exports = async function () {
  return {
    name: "Name" + Math.random(),
    description: "Description",
    numberInStock: 32,
    price: "$3.89",
    regionID: (await saveDummyRegion())._id.toString(),
  };
};
