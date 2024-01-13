import asyncHandler from "express-async-handler";
import Flower from "../../models/flower";
import { RequestHandler } from "express";

const delete_get: RequestHandler = async (req, res, next) => {
  const allFlowers = await Flower.find({}, "name url").sort({ name: 1 }).exec();

  res.render("flowers/flower_delete", {
    flower_list: allFlowers,
    title: "Pick a flower to delete",
  });
};
export default asyncHandler(delete_get as any);
