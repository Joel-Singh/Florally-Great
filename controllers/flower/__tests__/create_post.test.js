const { validationResult } = require("express-validator");
const emulateCallingController = require("../../testingUtils/emulateCallingController");
const create_post = require("../create_post");

describe("Test validation", () => {
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
});

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
