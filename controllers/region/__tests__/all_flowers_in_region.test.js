const path = require("path");

const Region = require(path.join(appRoot, "models", "region.js"));
const Flower = require(path.join(appRoot, "models", "flower.js"));

const all_flowers_in_region = require("../all_flowers_in_region.js");

test("Tries rendering correct view", async () => {
  const regionName = "regionName";

  await addRegionToDb(regionName);

  const { renderView } = await simulateInvokingAllFlowersInRegion(regionName)

  expect(renderView).toMatchInlineSnapshot(
    `"regions/all_flowers_in_region"`
  );
});

test("Passes in region with empty flower list", async () => {
  const regionName = "regionName";

  await addRegionToDb(regionName);

  const { renderLocals } = await simulateInvokingAllFlowersInRegion(regionName)

  expect(renderLocals).toMatchInlineSnapshot(`
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

  const { renderLocals } = await simulateInvokingAllFlowersInRegion(regionName);

  expect(renderLocals).toMatchInlineSnapshot(`
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
  const { fakeReq, fakeRes } = getFakeMiddlewareParameters(regionName);

  await all_flowers_in_region(fakeReq, fakeRes);

  return {
    renderCall: getRenderCall(fakeRes),
    renderLocals: getRenderLocals(fakeRes),
    renderView: getRenderView(fakeRes)
  }

  function getFakeMiddlewareParameters(regionName) {
    const fakeReq = {
      params: {
        name: regionName,
      },
    };

    const fakeRes = {
      render: jest.fn(),
    };

    return { fakeReq, fakeRes };
  }

  function getRenderCall(fakeRes) {
    return fakeRes.render.mock.calls[0];
  }
  function getRenderLocals(fakeRes) {
    return getRenderCall(fakeRes)[1];
  }
  function getRenderView(fakeRes) {
    return getRenderCall(fakeRes)[0];
  }
}
