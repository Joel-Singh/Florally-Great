const path = require("path");
const { default: Flower } = require(path.join(appRoot, "models", "flower.ts"));
const { default: Region } = require(path.join(appRoot, "models", "region.ts"));
const detail = require("../detail.js");
const {
  default: emulateCallingController,
} = require("../../testingUtils/emulateCallingController.ts");
const {
  default: saveDummyFlower,
} = require("../../../utils/dummyData/savingDummyDataToDb/saveDummyFlower.ts");

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
