import emulateCallingController from "./../../testingUtils/emulateCallingController.ts";
import with_flower_data from "./../with_flower_data.ts";
const {
  default: saveDummyFlower,
} = require("./../../../utils/dummyData/savingDummyDataToDb/saveDummyFlower.ts");

test("Passes in flower data to controller", async () => {
  const dummyFlowerName = "dummyFlowerName";
  await saveDummyFlower({
    name: dummyFlowerName,
  });

  const fakeController = jest.fn();
  const controllerWithFlowerData = with_flower_data(fakeController);

  await emulateCallingController(controllerWithFlowerData, {
    params: {
      name: dummyFlowerName,
    },
  });

  const flower = fakeController.mock.calls[0][3];
  expect(flower).toMatchInlineSnapshot(`
    {
      "__v": 0,
      "_id": "000000000000000000000004",
      "description": "Description",
      "name": "dummyFlowerName",
      "numberInStock": 32,
      "price": 3.89,
      "region": {
        "_id": "000000000000000000000003",
        "name": "name2",
      },
    }
  `);
});

test("Renders error if it couldn't find flower", async () => {
  const fakeController = jest.fn();
  const controllerWithFlowerData = with_flower_data(fakeController);

  const { getRenderInformation } = await emulateCallingController(
    controllerWithFlowerData,
    {
      params: {
        name: "I don't exist as a flower!",
      },
    }
  );

  const { view, locals } = getRenderInformation();
  expect(view).toMatchInlineSnapshot(`"message"`);
  expect(locals).toMatchInlineSnapshot(`
    {
      "title": "I don't exist as a flower! couldn't be found",
    }
  `);

  expect(fakeController).toHaveBeenCalledTimes(0);
});
