const path = require("path");

const Region = require(path.join(appRoot, "models", "region.js"));
const Flower = require(path.join(appRoot, "models", "flower.js"));

const all_flowers_in_region = require("../all_flowers_in_region.js");

test("Passes in just region", async () => {
  const regionName = "regionName";

  const { fakeReq, fakeRes } = getFakeMiddlewareParameters(regionName)

  await addRegionToDb(regionName)

  await all_flowers_in_region(fakeReq, fakeRes);

  snapshotRenderCall(fakeRes)
});

test("Passes in region and flowers", async () => {
  const regionName = "regionName";

  const { fakeReq, fakeRes } = getFakeMiddlewareParameters(regionName);

  const regionId = await addRegionToDb(regionName);
  await addFlowerToDb(regionId);

  await all_flowers_in_region(fakeReq, fakeRes);

  snapshotRenderCall(fakeRes);
});

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

async function addRegionToDb(regionName) {
  const id = "6483d106cdcd7f4f8d6ed46a"
  await new Region({
    name: regionName,
    description: "description",
    _id: "6483d106cdcd7f4f8d6ed46a",
  }).save();

  return id
}

async function addFlowerToDb(flowersRegionAsId) {
  await new Flower({
    name: "Flower in region",
    description: "description",
    price: 32,
    numberInStock: 92,
    region: flowersRegionAsId,
    _id: "6487734ae98dc419fc0f170d"
  }).save();
}

function snapshotRenderCall(fakeRes) {
  expect(fakeRes.render.mock.calls[0]).toMatchSnapshot();
}
