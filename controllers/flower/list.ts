import asyncHandler from "express-async-handler";
import Flower from "../../models/flower";

export default asyncHandler(async (req, res, next) => {
  const allFlowers = await Flower.find({}, "name description url")
    .sort({ name: 1 })
    .populate("region", "name")
    .exec();

  //@ts-ignore
  res.render("flowers/all_flowers", {
    flower_list: allFlowers,
    title: "All Flowers",
  });
});
