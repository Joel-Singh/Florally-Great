import { validationResult } from "express-validator";
import emulateCallingController from "../../../testingUtils/emulateCallingController";
import validateFlowerRequest from "../validateFlowerRequest";

import saveDummyRegion from "../../../../utils/dummyData/savingDummyDataToDb/saveDummyRegion";

import saveDummyFlower from "../../../../utils/dummyData/savingDummyDataToDb/saveDummyFlower";

import { getValidFlowerPostData } from "../../../../utils/dummyData/getValidData/getValidFlowerData";
import FlowerFormData from "../../../types/flowerFormData";

async function getValidationErrors(
  bodyOverwrites: Partial<FlowerFormData> = {},
  errorMsgMustInclude?: string
) {
  const { fakeReq } = await emulateCallingController(validateFlowerRequest, {
    body: {
      ...(await getValidFlowerPostData()),
      ...bodyOverwrites,
    },
  });

  const errors = validationResult(fakeReq).array();
  if (typeof errorMsgMustInclude === "undefined") return errors;
  else
    return errors.filter(({ msg }) => {
      return msg.includes(errorMsgMustInclude);
    });
}

test(`No errors with valid data`, async () => {
  expect(await getValidationErrors()).toEqual([]);
});

const flowerProperties = ["name", "description", "numberInStock", "price"];
test.each(flowerProperties)(
  `Doesn't accept empty input for %s`,
  async (property) => {
    expect(
      await getValidationErrors(
        {
          [property]: "",
        },
        "empty"
      )
    ).toMatchSnapshot();
  }
);

test.each(flowerProperties)(
  `Doesn't accept just spaces for %s`,
  async (property) => {
    expect(
      await getValidationErrors(
        {
          [property]: "   ",
        },
        "empty"
      )
    ).toMatchSnapshot();
  }
);

test(`Only accepts numbers for number in stock`, async () => {
  expect(
    await getValidationErrors({
      numberInStock: "32",
    })
  ).toEqual([]);

  expect(
    await getValidationErrors({
      numberInStock: "not a number",
    })
  ).toMatchSnapshot();
});

test(`Only accepts property formatted prices`, async () => {
  expect(
    await getValidationErrors(
      {
        price: "32",
      },
      "format"
    )
  ).toMatchSnapshot();

  expect(
    await getValidationErrors(
      {
        price: "32.00",
      },
      "format"
    )
  ).toMatchSnapshot();

  expect(
    await getValidationErrors(
      {
        price: "$3aaa",
      },
      "format"
    )
  ).toMatchSnapshot();

  expect(
    await getValidationErrors(
      {
        price: "$3.86",
      },
      "format"
    )
  ).toEqual([]);

  expect(
    await getValidationErrors(
      {
        price: "$3",
      },
      "format"
    )
  ).toEqual([]);
});

test(`Doesn't accept nonexistent regions`, async () => {
  expect(
    await getValidationErrors(
      {
        regionID: "asdfasdf",
      },
      "Region does not exist"
    )
  ).toMatchInlineSnapshot(`
      [
        {
          "location": "body",
          "msg": "Region does not exist",
          "path": "regionID",
          "type": "field",
          "value": "asdfasdf",
        },
      ]
    `);

  const realRegionID = (await saveDummyRegion())._id.toString();
  expect(
    await getValidationErrors(
      {
        regionID: realRegionID,
      },
      "Region does not exist"
    )
  ).toEqual([]);
});

test(`Doesn't accept duplicate flowers`, async () => {
  await saveDummyFlower({ name: "duplicate" });

  expect(
    await getValidationErrors({
      name: "duplicate",
    })
  ).toMatchInlineSnapshot(`
      [
        {
          "location": "body",
          "msg": "Flower with that name already exists",
          "path": "name",
          "type": "field",
          "value": "duplicate",
        },
      ]
    `);
});
