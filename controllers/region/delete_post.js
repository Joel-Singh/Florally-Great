const asyncHandler = require("express-async-handler");
const path = require("path");
const Region = require(path.join(appRoot, "models", "region.js"));
const { default: Flower } = require(path.join(appRoot, "models", "flower.ts"));
const renderDeleteRegion = require("./rendersWithDefaultLocals/renderDeleteRegion.js");

module.exports = asyncHandler(async (req, res, next) => {
  const { regionId, fromRegionDetailPage } = req.body;

  if (typeof regionId === "undefined") {
    await renderDeleteRegion(res, {
      errors: [
        {
          msg: "Please select a region",
        },
      ],
    });
    return;
  }

  if (await regionHasFlower(regionId)) {
    await regionDeleteFailureRender(regionId, res, fromRegionDetailPage);
  } else {
    await Region.findByIdAndDelete(regionId);
    await regionDeleteSuccessRender(res, fromRegionDetailPage);
  }
});

async function regionDeleteFailureRender(regionId, res, fromRegionDetailPage) {
  if (fromRegionDetailPage === true) {
    res.render("message", {
      title: "failure!",
      message: "Region not deleted",
    });
    return;
  } else {
    await renderDeleteRegionWithFlowerError(regionId, res);
    return;
  }
}

async function regionDeleteSuccessRender(res, fromRegionDetailPage) {
  if (fromRegionDetailPage === true) {
    res.render("message", {
      title: "success!",
      message: "Region successfully deleted",
    });
  } else {
    res.redirect("/regions/delete");
    return;
  }
}

async function regionHasFlower(regionId) {
  const flower = await Flower.findOne({ region: regionId }).exec();
  if (flower === null) return false;
  else return true;
}

async function renderDeleteRegionWithFlowerError(regionId, res) {
  const flowersOfRegion = await Flower.find({ region: regionId }).exec();
  const errors = [
    {
      msg: createFlowerRegionError(flowersOfRegion),
    },
  ];

  await renderDeleteRegion(res, {
    errors,
  });

  function createFlowerRegionError(flowersOfRegion) {
    const flowersAsAnchorsInListItem = flowersOfRegion.map((flower) => {
      const { url, name } = flower;
      return `<li><a href="${url}">${name}</a></li>`;
    });

    const allListItemsInSingleString = flowersAsAnchorsInListItem.reduce(
      (previous, current) => {
        return previous + current;
      }
    );

    const unorderedListOfFlowers =
      "<ul>" + allListItemsInSingleString + "</ul>";

    const header = `<h2>Region has flowers, delete them first: </h2>`;

    return header + unorderedListOfFlowers;
  }
}
