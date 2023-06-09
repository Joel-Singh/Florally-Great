const saveDummyRegion = require("./savingDummyDataToDb/saveDummyRegion.js");
const {
  generateSequentialNumber,
  generateSequentialObjectId,
} = require("./SequentialGenerators.js");

async function getValidFlowerPostData() {
  return {
    name: "Name" + generateSequentialNumber(),
    description: "Description",
    numberInStock: 32,
    price: "$3.89",
    regionID: (await saveDummyRegion())._id.toString(),
    _id: generateSequentialObjectId(),
  };
}

async function getValidFlowerModelData() {
  const data = await getValidFlowerPostData();

  data.region = data.regionID;
  delete data.regionID;

  data.price = 3.89;

  return data;
}

module.exports = {
  getValidFlowerPostData,
  getValidFlowerModelData,
};
