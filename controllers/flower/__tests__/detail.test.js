const path = require("path");
const Flower = require(path.join(appRoot, "models", "flower.js"));
const Region = require(path.join(appRoot, "models", "region.js"));
const detail = require("../detail.js");
const emulateCallingController = require("../../testingUtils/emulateCallingController.js");
const {
  saveDummyFlower,
  saveDummyRegion,
} = require("../../testingUtils/savingDummyDataToDb.js");

test("Passes in flower information", async () => {
  const flowerName = "name";
  await saveFlower(flowerName);

  const { fakeRes, getRenderInformation } = await emulateCallingController(
    detail,
    { params: { name: flowerName } }
  );
  const { locals } = getRenderInformation(fakeRes);

  expect(locals).toMatchInlineSnapshot(`
    {
      "description": "description",
      "flowerId": "64936dd0799eebb27f143f77",
      "name": "name",
      "numberInStock": 21,
      "price": 32,
      "region": {
        "_id": "64936c336ee5fbeeed356dda",
        "name": "name",
      },
      "title": "name",
    }
  `);
});

async function saveFlower(flowerName) {
  const regionId = "64936c336ee5fbeeed356dda";
  const flowerId = "64936dd0799eebb27f143f77";

  await saveDummyRegion({ _id: regionId });

  await saveDummyFlower(regionId, { _id: flowerId, name: flowerName });
}
