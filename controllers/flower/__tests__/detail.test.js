const path = require("path");
const Flower = require(path.join(appRoot, "models", "flower.js"));
const Region = require(path.join(appRoot, "models", "region.js"));
const detail = require("../detail.js");
const emulateCallingController = require("../../testingUtils/emulateCallingController.js");
const saveDummyFlower = require("../../../utils/dummyData/savingDummyDataToDb/saveDummyFlower.js");

test("Passes in flower information to flower detail", async () => {
  const flowerName = "name";
  await saveDummyFlower({ name: flowerName });

  const { getRenderInformation } = await emulateCallingController(detail, {
    params: { name: flowerName },
  });
  const { view, locals } = getRenderInformation();

  expect(view).toMatchInlineSnapshot(`"flowers/flower_detail"`);
  expect(locals).toMatchInlineSnapshot(`
    {
      "description": "Description",
      "flowerId": "000000000000000000000004",
      "flowerUrl": "/flowers/name",
      "name": "name",
      "numberInStock": 32,
      "price": 3.89,
      "region": {
        "_id": "000000000000000000000003",
        "name": "name2",
      },
      "title": "name",
    }
  `);
});

test("Renders error if invalid flower is passed in", async () => {
  const { getRenderInformation } = await emulateCallingController(detail, {
    params: { name: "FlowerThatDoesNotExist" },
  });
  const { view, locals } = getRenderInformation();

  expect(view).toMatchInlineSnapshot(`"message"`);
  expect(locals).toMatchInlineSnapshot(`
    {
      "title": "FlowerThatDoesNotExist couldn't be found",
    }
  `);
});
