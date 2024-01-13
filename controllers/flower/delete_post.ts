import asyncHandler from "express-async-handler";
import Flower from "../../models/flower.ts";

import { decode } from "he";

export default asyncHandler(async (req, res, next) => {
  //@ts-ignore
  const { flowerId } = req.body;
  await Flower.findByIdAndDelete(flowerId);
  //@ts-ignore
  const name = decode(req.params.name);

  //@ts-ignore
  res.render("message", {
    title: `${name || "Flower"} deleted!`,
    message: `${name || "Flower"} deleted successfully`,
  });
});
