import emulateCallingController from "./../../testingUtils/emulateCallingController";
import update_post from "./../update_post";
import saveDummyFlower from "./../../../utils/dummyData/savingDummyDataToDb/saveDummyFlower";
import saveDummyRegion from "./../../../utils/dummyData/savingDummyDataToDb/saveDummyRegion";

import Flower, { IFlowerDocument } from "./../../../models/flower";
import { getValidFlowerPostData } from "../../../utils/dummyData/getValidData/getValidFlowerData";
import {
  FlowerUpdateFormData,
  FlowerUpdateFormLocals,
} from "../../../views/flowers/flowerFormInterfaces";

test("Updates flower in db", async () => {
  const dummyFlower: IFlowerDocument = (await saveDummyFlower()).toObject({
    versionKey: false,
  });

  const flowerPostData: FlowerUpdateFormData = {
    name: "newName",
    description: "newDescription",
    numberInStock: "193",
    price: "$9.14",
    regionID: (await saveDummyRegion())._id!.toString(),
    id: dummyFlower._id!.toString(),
    isUpdate: "true",
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

test("Redirects to flower on successful update", async () => {
  const dummyFlower: IFlowerDocument = await saveDummyFlower();
  const dummyFlowerId: string = dummyFlower._id.toString();

  const body: FlowerUpdateFormData = {
    ...(await getValidFlowerPostData()),
    id: dummyFlowerId,
    isUpdate: "true",
  };

  const { getRedirectInformation } = await emulateCallingController(
    update_post,
    {
      body,
    }
  );

  const { redirectPage } = getRedirectInformation();

  expect(redirectPage).toBeDefined();
  expect(redirectPage).toMatchInlineSnapshot(`"/flowers/Name11"`);
});

test("Rerenders form with error on error", async () => {
  const dummyFlower: IFlowerDocument = await saveDummyFlower();
  const dummyFlowerId: string = dummyFlower._id.toString();
  const invalidName = "";

  const body: FlowerUpdateFormData = {
    ...(await getValidFlowerPostData()),
    name: invalidName,
    id: dummyFlowerId,
    isUpdate: "true",
  };

  const { getRenderInformation } = await emulateCallingController(update_post, {
    body,
    params: {
      name: dummyFlower.name,
    },
  });

  const { view, locals } = getRenderInformation();

  expect(view).toMatchInlineSnapshot(`"flowers/flower_form_update"`);
  expect(locals.errors).toMatchInlineSnapshot(`
    [
      {
        "location": "body",
        "msg": "Name can't be empty",
        "path": "name",
        "type": "field",
        "value": "",
      },
    ]
  `);
});

test("Rerenders on error with previous data", async () => {
  const dummyFlower: IFlowerDocument = await saveDummyFlower();
  const dummyFlowerId: string = dummyFlower._id.toString();
  const invalidName = "";

  const body: FlowerUpdateFormData = {
    ...(await getValidFlowerPostData()),
    name: invalidName,
    id: dummyFlowerId,
    isUpdate: "true",
  };

  const { getRenderInformation } = await emulateCallingController(update_post, {
    body,
    params: {
      name: dummyFlower.name,
    },
  });

  const locals: FlowerUpdateFormLocals = getRenderInformation().locals;

  expect(locals.prepopulatedValues).toMatchInlineSnapshot(`
    {
      "description": "Description",
      "id": "000000000000000000000024",
      "name": "",
      "numberInStock": "32",
      "price": "$3.89",
      "regionID": "000000000000000000000027",
    }
  `);
});

test("Rerenders on error with flowerName", async () => {
  const dummyFlower: IFlowerDocument = await saveDummyFlower();
  const dummyFlowerId: string = dummyFlower._id.toString();
  const invalidName = "";

  const body: FlowerUpdateFormData = {
    ...(await getValidFlowerPostData()),
    name: invalidName,
    id: dummyFlowerId,
    isUpdate: "true",
  };

  const { getRenderInformation } = await emulateCallingController(update_post, {
    body,
    params: {
      name: dummyFlower.name,
    },
  });

  const locals: FlowerUpdateFormLocals = getRenderInformation().locals;

  expect(locals.flowerName).toMatchInlineSnapshot(`"Name28"`);
});
