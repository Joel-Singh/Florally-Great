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

async function testValidation<Key extends keyof FlowerFormData>(
  property: Key,
  propertyValue: FlowerFormData[Key],
  options:
    | {
        isValid: true;
      }
    | {
        isValid: false;
        errorFilter: string;
      }
) {
  if (options.isValid) {
    expect(
      await getValidationErrors({
        [property]: propertyValue,
      })
    ).toEqual([]);
  } else {
    expect(
      await getValidationErrors(
        {
          [property]: propertyValue,
        },
        options.errorFilter
      )
    ).toMatchSnapshot();
  }
}

test(`No errors with valid data`, async () => {
  expect(await getValidationErrors()).toEqual([]);
});

const flowerProperties: Array<keyof FlowerFormData> = [
  "name",
  "description",
  "numberInStock",
  "price",
];

describe("Empty input", () => {
  test.each(flowerProperties)(
    `Doesn't accept empty input for %s`,
    async (property) => {
      await testValidation(property, "", {
        isValid: false,
        errorFilter: "empty",
      });
    }
  );
});

describe("Just spaces", () => {
  test.each(flowerProperties)(
    `Doesn't accept just spaces for %s`,
    async (property) => {
      await testValidation(property, "   ", {
        isValid: false,
        errorFilter: "empty",
      });
    }
  );
});

test(`Only accepts numbers for number in stock`, async () => {
  await testValidation("numberInStock", "32", {
    isValid: true,
  });

  await testValidation("numberInStock", "not a number", {
    isValid: false,
    errorFilter: "needs to be a number",
  });
});

describe(`Price validation`, () => {
  const invalidFlowerPrices: string[] = ["$3aaa", "32.00", "32"];

  const validFlowerPrices: string[] = ["$3.86", "$3"];

  test.each(invalidFlowerPrices)(
    `%s flower price gives error`,
    async (flowerPrice) => {
      await testValidation("price", flowerPrice, {
        isValid: false,
        errorFilter: "format",
      });
    }
  );

  test.each(validFlowerPrices)(
    `%s flower price DOES NOT give error`,
    async (flowerPrice) => {
      await testValidation("price", flowerPrice, {
        isValid: true,
      });
    }
  );
});

test(`Doesn't accept nonexistent regions`, async () => {
  await testValidation("regionID", "asdfasdf", {
    isValid: false,
    errorFilter: "Region does not exist",
  });

  const realRegionID = (await saveDummyRegion())._id.toString();
  await testValidation("regionID", realRegionID, {
    isValid: true,
  });
});

test(`Doesn't accept duplicate flowers`, async () => {
  await saveDummyFlower({ name: "duplicate" });

  await testValidation("name", "duplicate", {
    isValid: false,
    errorFilter: "name already exists",
  });
});
