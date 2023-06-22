const path = require("path");
const Flower = require(path.join(appRoot, "models", "flower.js"));
const Region = require(path.join(appRoot, "models", "region.js"));
const detail = require("../detail.js");
const emulateCallingController = require("../../testingUtils/emulateCallingController.js");
const {
  saveDummyFlower,
} = require("../../testingUtils/savingDummyDataToDb.js");

test("Passes in flower information to flower detail", async () => {
  const flowerName = "name";
  await saveDummyFlower({ name: flowerName });

  const { fakeRes, getRenderInformation } = await emulateCallingController(
    detail,
    { params: { name: flowerName } }
  );
  const { view, locals } = getRenderInformation(fakeRes);

  expect(view).toMatchInlineSnapshot(`"flowers/flower_detail"`);
  expect(locals).toMatchInlineSnapshot(`
    {
      "description": "description",
      "flowerId": "000000000000000000000002",
      "flowerUrl": "/flowers/name",
      "name": "name",
      "numberInStock": 21,
      "price": 32,
      "region": {
        "_id": "000000000000000000000001",
        "name": "name",
      },
      "title": "name",
    }
  `);
});

test("Renders error if invalid flower is passed in", async () => {
  const { fakeRes, getRenderInformation } = await emulateCallingController(
    detail,
    { params: { name: "FlowerThatDoesNotExist" } }
  );
  const { view, locals } = getRenderInformation(fakeRes);

  expect(view).toMatchInlineSnapshot(`"message"`);
  expect(locals).toMatchInlineSnapshot(`
    {
      "title": "FlowerThatDoesNotExist couldn't be found",
    }
  `);
});
