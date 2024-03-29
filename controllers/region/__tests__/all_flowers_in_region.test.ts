import Region from "../../../models/region";
import Flower from "../../../models/flower";
import emulateCallingController from "../../testingUtils/emulateCallingController";
import all_flowers_in_region from "../all_flowers_in_region";

test("Tries rendering correct view", async () => {
  const regionName = "regionName";

  await addRegionToDb(regionName);

  const { getRenderInformation } = await simulateInvokingAllFlowersInRegion(
    regionName
  );
  const { view } = getRenderInformation();

  expect(view).toMatchInlineSnapshot(`"regions/all_flowers_in_region"`);
});

test("Passes in region with empty flower list", async () => {
  const regionName = "regionName";

  await addRegionToDb(regionName);

  const { getRenderInformation } = await simulateInvokingAllFlowersInRegion(
    regionName
  );
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

  const { getRenderInformation } = await simulateInvokingAllFlowersInRegion(
    regionName
  );
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

test("Calls next with a 404 if region not found", async () => {
  const nonExistingRegion = "IDontExist";

  const { getMockNextInformation } = await simulateInvokingAllFlowersInRegion(
    nonExistingRegion
  );

  const { errorOrEmpty } = getMockNextInformation();
  expect(errorOrEmpty.status).toMatchInlineSnapshot(`404`);
});

async function addRegionToDb(regionName: string) {
  const id = "6483d106cdcd7f4f8d6ed46a";
  await new Region({
    name: regionName,
    description: "description",
    _id: "6483d106cdcd7f4f8d6ed46a",
  }).save();

  return id;
}

async function addFlowerToDb(flowersRegionAsId: string) {
  await new Flower({
    name: "Flower in region",
    description: "description",
    price: 32,
    numberInStock: 92,
    region: flowersRegionAsId,
    _id: "6487734ae98dc419fc0f170d",
  }).save();
}

async function simulateInvokingAllFlowersInRegion(regionName: string) {
  return await emulateCallingController(all_flowers_in_region, {
    params: { name: regionName },
  });
}
