import asyncHandler from "express-async-handler";
import renderFlowerForm from "./rendersWithDefaultLocals/renderFlowerForm";
import with_flower_data from "./with_flower_data.js";

export default asyncHandler(
  with_flower_data(async (req, res, next, flower) => {
    const { name, description, numberInStock, price, _id } = flower;
    await renderFlowerForm(
      res,
      {
        flowerName: name,
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
