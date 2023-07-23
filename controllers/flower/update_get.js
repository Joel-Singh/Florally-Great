const asyncHandler = require("express-async-handler");
const renderFlowerForm = require("./rendersWithDefaultLocals/renderFlowerForm");
const { default: Flower } = require("./../../models/flower.ts");
const with_flower_data = require("./with_flower_data.js");

module.exports = asyncHandler(
  with_flower_data(async (req, res, next, flower) => {
    const { name, description, numberInStock, price, _id } = flower;
    await renderFlowerForm(
      res,
      {
        prepopulatedValues: {
          name,
          description,
          numberInStock,
          price: "$" + price,
          regionName: flower.region.name,
          id: _id.toString(),
        },
      },
      {
        isUpdate: true,
      }
    );
  })
);
