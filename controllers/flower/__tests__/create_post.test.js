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
