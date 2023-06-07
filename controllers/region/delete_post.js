const asyncHandler = require("express-async-handler");
const path = require("path");
const Region = require(path.join(appRoot, "models", "region.js"));
const Flower = require(path.join(appRoot, "models", "flower.js"));
const renderDeleteRegion = require("./rendersWithDefaultLocals/renderDeleteRegion.js");

module.exports = asyncHandler(async (req, res, next) => {
  if (typeof req.body.region === 'undefined') {
    renderDeleteRegion(res, {
      errors: [{
        msg: "Please select a region"
      }]
    });
    return;
  }

  const regionId = req.body.region;

  if (!(await regionHasFlower(regionId))) {
    await Region.findByIdAndDelete(regionId);
    res.redirect("regions/delete");
  } else {
    const flowersOfRegion = await Flower.find({ region: regionId }).exec();
    const errors = [
      {
        msg: createFlowerRegionError(flowersOfRegion),
      },
    ];

    renderDeleteRegion(res, {
      errors,
    });
  }
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

  const unorderedListOfFlowers = "<ul>" + allListItemsInSingleString + "</ul>";

  const header = `<h2>Region has flowers, delete them first: </h2>`;

  return header + unorderedListOfFlowers;
}

async function regionHasFlower(regionId) {
  const flower = await Flower.findOne({ region: regionId }).exec();
  if (flower === null) return false;
  else return true;
}
