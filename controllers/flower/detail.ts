import asyncHandler from "express-async-handler";
import with_flower_data from "./with_flower_data.ts";

export default asyncHandler(
  with_flower_data((req, res, next, flower) => {
    const { name, description, price, numberInStock, _id } = flower;
    res.render("flowers/flower_detail", {
      title: name,
      name,
      description,
      price,
      numberInStock,
      flowerId: _id,
      flowerUrl: flower.url,
      region: flower.region,
    });
  })
);
