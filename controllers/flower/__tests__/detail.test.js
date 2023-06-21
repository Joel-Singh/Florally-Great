const path = require("path");
const Flower = require(path.join(appRoot, "models", "flower.js"));
const Region = require(path.join(appRoot, "models", "region.js"));
const detail = require("../detail.js");
const emulateCallingController = require("../../testingUtils/emulateCallingController.js");

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

  await new Region({
    name: "name",
    description: "description",
    _id: regionId,
  }).save();

  await new Flower({
    name: flowerName,
    description: "description",
    price: 32,
    numberInStock: 21,
    region: regionId,
  }).save();
}
