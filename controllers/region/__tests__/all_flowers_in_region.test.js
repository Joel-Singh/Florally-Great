const path = require("path");

const Region = require(path.join(appRoot, "models", "region.js"));

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
