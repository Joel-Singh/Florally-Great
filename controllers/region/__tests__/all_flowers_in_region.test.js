const path = require("path");

const Region = require(path.join(appRoot, "models", "region.js"));
const Flower = require(path.join(appRoot, "models", "flower.js"));

const all_flowers_in_region = require("../all_flowers_in_region.js");

test("Passes in just region", async () => {
  const regionName = "regionName";
  const fakeReq = {
    params: {
      name: regionName,
    },
  };

  const fakeRes = {
    render: jest.fn(),
  };

  await new Region({
    name: regionName,
    description: "description",
    _id: "6483d106cdcd7f4f8d6ed46a",
  }).save();

  await all_flowers_in_region(fakeReq, fakeRes);

  expect(fakeRes.render.mock.calls).toMatchInlineSnapshot(`
    [
      [
        "regions/all_flowers_in_region",
        {
          "flower_list": [],
          "region": {
            "__v": 0,
            "_id": "6483d106cdcd7f4f8d6ed46a",
            "description": "description",
            "name": "regionName",
          },
        },
      ],
    ]
  `);
});

test("Passes in region and flowers", async () => {
  const regionName = "regionName";
  const regionId = "6483d106cdcd7f4f8d6ed46a";

  const fakeReq = {
    params: {
      name: regionName,
    },
  };

  const fakeRes = {
    render: jest.fn(),
  };

  await new Region({
    name: regionName,
    description: "description",
    _id: "6483d106cdcd7f4f8d6ed46a",
  }).save();

  await new Flower({
    name: "Flower in region",
    description: "description",
    price: 32,
    numberInStock: 92,
    region: regionId,
    _id: "6487734ae98dc419fc0f170d"
  }).save();

  await all_flowers_in_region(fakeReq, fakeRes);

  expect(fakeRes.render.mock.calls).toMatchSnapshot();
});
