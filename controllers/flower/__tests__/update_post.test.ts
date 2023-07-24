import emulateCallingController from "./../../testingUtils/emulateCallingController";
import update_post from "./../update_post";
import saveDummyFlower from "./../../../utils/dummyData/savingDummyDataToDb/saveDummyFlower";
import saveDummyRegion from "./../../../utils/dummyData/savingDummyDataToDb/saveDummyRegion";

import Flower, { IFlowerDocument } from "./../../../models/flower";
import FlowerFormData from "../../types/flowerFormData";

test("Updates flower in db", async () => {
  const dummyFlower: IFlowerDocument = (await saveDummyFlower()).toObject({
    versionKey: false,
  });

  const flowerPostData: FlowerFormData = {
    name: "newName",
    description: "newDescription",
    numberInStock: "193",
    price: "$9.14",
    regionID: (await saveDummyRegion())._id.toString(),
    id: dummyFlower._id,
  };

  await emulateCallingController(update_post, {
    body: {
      ...flowerPostData,
    },
  });

  const updatedFlower = (await Flower.findById(dummyFlower._id))!;

  expect(updatedFlower).not.toBeNull();
  expect(updatedFlower.name).toBe(flowerPostData.name);
  expect(updatedFlower.description).toBe(flowerPostData.description);
  expect(updatedFlower.numberInStock).toBe(
    Number(flowerPostData.numberInStock)
  );
  expect(updatedFlower.price).toBe(parseFloat(flowerPostData.price.slice(1)));

  expect(updatedFlower.region.toString()).toBe(flowerPostData.regionID);
});
