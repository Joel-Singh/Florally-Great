const path = require("path");

const { default: Region } = require(path.join(appRoot, "models", "region.ts"));
const { default: Flower } = require(path.join(appRoot, "models", "flower.ts"));

const {
  default: emulateCallingController,
} = require("../../testingUtils/emulateCallingController.ts");
const { default: all_flowers_in_region } = require("../all_flowers_in_region");

test("Tries rendering correct view", async () => {
  const regionName = "regionName";

  await addRegionToDb(regionName);

  const { getRenderInformation } =
    await simulateInvokingAllFlowersInRegion(regionName);
  const { view } = getRenderInformation();

  expect(view).toMatchInlineSnapshot(`"regions/all_flowers_in_region"`);
});

test("Passes in region with empty flower list", async () => {
  const regionName = "regionName";

  await addRegionToDb(regionName);

  const { getRenderInformation } =
    await simulateInvokingAllFlowersInRegion(regionName);
  const { locals } = getRenderInformation();

  expect(locals).toMatchInlineSnapshot(`
    {
      "flower_list": [],
      "region": {
        "__v": 0,
        "_id": "6483d106cdcd7f4f8d6ed46a",
        "description": "description",
        "name": "regionName",
      },
    }
  `);
});

test("Passes in region and flowers", async () => {
  const regionName = "regionName";

  const regionId = await addRegionToDb(regionName);
  await addFlowerToDb(regionId);

  const { getRenderInformation } =
    await simulateInvokingAllFlowersInRegion(regionName);
  const { locals } = getRenderInformation();

  expect(locals).toMatchInlineSnapshot(`
    {
      "flower_list": [
        {
          "__v": 0,
          "_id": "6487734ae98dc419fc0f170d",
          "description": "description",
          "name": "Flower in region",
          "numberInStock": 92,
          "price": 32,
          "region": "6483d106cdcd7f4f8d6ed46a",
        },
      ],
      "region": {
        "__v": 0,
        "_id": "6483d106cdcd7f4f8d6ed46a",
        "description": "description",
        "name": "regionName",
      },
    }
  `);
});

async function addRegionToDb(regionName) {
  const id = "6483d106cdcd7f4f8d6ed46a";
  await new Region({
    name: regionName,
    description: "description",
    _id: "6483d106cdcd7f4f8d6ed46a",
  }).save();

  return id;
}

async function addFlowerToDb(flowersRegionAsId) {
  await new Flower({
    name: "Flower in region",
    description: "description",
    price: 32,
    numberInStock: 92,
    region: flowersRegionAsId,
    _id: "6487734ae98dc419fc0f170d",
  }).save();
}

async function simulateInvokingAllFlowersInRegion(regionName) {
  return await emulateCallingController(all_flowers_in_region, {
    params: { name: regionName },
  });
}
