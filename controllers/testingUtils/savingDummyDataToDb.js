const path = require("path");
const Flower = require(path.join(appRoot, "models", "flower.js"));
const Region = require(path.join(appRoot, "models", "region.js"));

const generateSequentialObjectid = (() => {
  let counter = 0;

  function generateId() {
    counter++;
    const counterStr = counter.toString().padStart(24, "0");
    return counterStr;
  }
  return generateId;
})();

exports.saveDummyFlower = async function (overwrites, regionId) {
  if (typeof regionId === "undefined")
    overwrites.region = (await saveDummyRegion())._id;

  const dummyData = {
    name: "name",
    description: "description",
    price: 32,
    numberInStock: 21,
    region: regionId,
    _id: generateSequentialObjectid(),
    ...overwrites,
  };

  return await new Flower(dummyData).save();
};

exports.saveDummyRegion = saveDummyRegion;

async function saveDummyRegion(overwrites) {
  const dummyData = {
    name: "name",
    description: "description",
    _id: generateSequentialObjectid(),
    ...overwrites,
  };
  return await new Region(dummyData).save();
}
