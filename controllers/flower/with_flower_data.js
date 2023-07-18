const Flower = require("./../../models/flower.js");
const asyncHandler = require("express-async-handler");

module.exports = function (controller) {
  return async (req, res, next) => {
    const flowerName = req.params.name;
    let flower = await Flower.findOne({ name: flowerName })
      .populate("region", "name")
      .exec();

    if (flower === null) {
      res.render("message", { title: `${flowerName} couldn't be found` });
      return;
    }

    await controller(req, res, next, flower);
  };
};
