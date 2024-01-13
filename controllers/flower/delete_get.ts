import asyncHandler from "express-async-handler";
import Flower from "../../models/flower";
import { RequestHandler } from "express";
import FlowerDeleteLocals from "../../views/flowers/flowerDeleteInterfaces";

const delete_get: RequestHandler = async (req, res, next) => {
  const allFlowers = await Flower.find({}, "name url _id")
    .sort({ name: 1 })
    .exec();

  const flower_list: FlowerDeleteLocals["flower_list"] = allFlowers.map((f) => {
    return { name: f.name, url: f.url, id: f._id.toString() };
  });

  res.render("flowers/flower_delete", {
    flower_list,
    title: "Pick a flower to delete",
  });
};
export default delete_get;
