import asyncHandler from "express-async-handler";
import renderDeleteRegion from "./rendersWithDefaultLocals/renderDeleteRegion.js";

import Flower from "../../models/flower";
import Region from "../../models/region";
import { RequestHandler } from "express";
import {
  RegionDeleteFormData,
  RequestWithRegionDeleteFormData,
} from "../../views/regions/regionDeleteFormInterfaces.js";
import { Response } from "express-serve-static-core";

const delete_post: RequestHandler = async (
  req: RequestWithRegionDeleteFormData,
  res,
  next
) => {
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
};

export default asyncHandler(delete_post as any);

async function regionDeleteFailureRender(
  regionId: string,
  res: Response,
  fromRegionDetailPage: RegionDeleteFormData["fromRegionDetailPage"]
) {
  if (fromRegionDetailPage) {
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

async function regionDeleteSuccessRender(
  res,
  fromRegionDetailPage: RegionDeleteFormData["fromRegionDetailPage"]
) {
  if (fromRegionDetailPage) {
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
