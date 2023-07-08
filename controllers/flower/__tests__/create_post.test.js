const { validationResult } = require("express-validator");
const emulateCallingController = require("../../testingUtils/emulateCallingController");
const create_post = require("../create_post");
const { saveDummyRegion } = require("../../testingUtils/savingDummyDataToDb");
const Region = require("../../../models/region");

describe("Test validation", () => {
  async function getFilteredValidationErrors(name, value, msgMustInclude) {
    const { fakeReq } = await emulateCallingController(create_post, {
      body: {
        [name]: value,
      },
    });

    const resultOfValidation = validationResult(fakeReq);
    const errorsForJustProperty = resultOfValidation.errors.filter(
      ({ path, msg }) => {
        return path === name && msg.includes(msgMustInclude);
      }
    );

    return errorsForJustProperty;
  }

  const flowerProperties = ["name", "description", "numberInStock", "price"];
  test.each(flowerProperties)(
    `Doesn't accept empty input for %s`,
    async (property) => {
      expect(
        await getFilteredValidationErrors(property, "", "empty")
      ).toMatchSnapshot();
    }
  );

  test.each(flowerProperties)(
    `Doesn't accept just spaces for %s`,
    async (property) => {
      expect(
        await getFilteredValidationErrors(property, "   ", "empty")
      ).toMatchSnapshot();
    }
  );

  test(`Only accepts numbers for number in stock`, async () => {
    expect(
      await getFilteredValidationErrors("numberInStock", 32, "number")
    ).toEqual([]);

    expect(
      await getFilteredValidationErrors(
        "numberInStock",
        "not a number",
        "number"
      )
    ).toMatchSnapshot();
  });

  test(`Only accepts property formatted prices`, async () => {
    expect(
      await getFilteredValidationErrors("price", 32, "format")
    ).toMatchSnapshot();

    expect(
      await getFilteredValidationErrors("price", "$3.86", "format")
    ).toEqual([]);
  });

  test(`Doesn't accept nonexistent regions`, async () => {
    expect(
      await getFilteredValidationErrors(
        "regionID",
        "asdfasdf",
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
      await getFilteredValidationErrors(
        "regionID",
        realRegionID,
        "Region does not exist"
      )
    ).toEqual([]);
  });
});
