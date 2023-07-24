const emulateCallingController = require("./../../testingUtils/emulateCallingController.js");
const { default: update_post } = require("./../update_post.ts");
const saveDummyFlower = require("./../../../utils/dummyData/savingDummyDataToDb/saveDummyFlower.js");
const saveDummyRegion = require("./../../../utils/dummyData/savingDummyDataToDb/saveDummyRegion.js");

const { default: Flower } = require("./../../../models/flower.ts");

test("Updates flower in db", async () => {
  const dummyFlower = (await saveDummyFlower()).toObject({ versionKey: false });

  const flowerPostData = {
    name: "newName",
    description: "newDescription",
    numberInStock: 193,
    price: "$9.14",
    regionID: (await saveDummyRegion())._id.toString(),
    id: dummyFlower._id,
  };

  await emulateCallingController(update_post, {
    body: {
      ...flowerPostData,
    },
  });

  const updatedFlower = await Flower.findById(dummyFlower._id);

  expect(updatedFlower.name).toBe(flowerPostData.name);
  expect(updatedFlower.description).toBe(flowerPostData.description);
  expect(updatedFlower.numberInStock).toBe(flowerPostData.numberInStock);
  expect(updatedFlower.price).toBe(parseFloat(flowerPostData.price.slice(1)));

  expect(updatedFlower.region.toString()).toBe(flowerPostData.regionID);
});
