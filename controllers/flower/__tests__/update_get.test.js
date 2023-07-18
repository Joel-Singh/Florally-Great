const emulateCallingController = require("./../../testingUtils/emulateCallingController.js");
const update_get = require("../update_get.js");
const saveDummyFlower = require("./../../../utils/dummyData/savingDummyDataToDb/saveDummyFlower.js");

test("Renders flower form, passing in prepopulated values", async () => {
  const flower = await saveDummyFlower();
  const { getRenderInformation } = await emulateCallingController(update_get, {
    params: {
      name: flower.name,
    },
  });

  const { view, locals } = getRenderInformation();

  expect(view).toMatchInlineSnapshot(`"flowers/flower_form"`);

  expect(locals.prepopulatedValues).toMatchInlineSnapshot(`
    {
      "description": "Description",
      "name": "Name1",
      "numberInStock": 32,
      "price": "$3.89",
      "regionName": "name2",
    }
  `);
});
