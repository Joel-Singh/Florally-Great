const { default: Flower} = require("./../../models/flower.ts");
const asyncHandler = require("express-async-handler");

module.exports = function (controller) {
  return async (req, res, next) => {
    const flowerName = req.params.name;
    const flower = await Flower.findOne({ name: flowerName })
      .populate("region", "name")
      .exec();

    if (flower === null) {
      res.render("message", { title: `${flowerName} couldn't be found` });
      return;
    }

    await controller(req, res, next, flower);
  };
};
