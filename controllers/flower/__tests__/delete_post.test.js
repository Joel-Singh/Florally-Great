const {
  default: emulateCallingController,
} = require("../../testingUtils/emulateCallingController.ts");

const {
  default: saveDummyFlower,
} = require("../../../utils/dummyData/savingDummyDataToDb/saveDummyFlower.ts");

const { default: Flower } = require("../../../models/flower.ts");

const delete_post = require("../delete_post.js");

test("Deletes flower", async () => {
  const id = (await saveDummyFlower())._id;
  await emulateCallingController(
    delete_post,
    { body: { flowerId: id }, params: { name: "name" } },
    {}
  );

  expect(await Flower.findById(id)).toBeNull();
});

test("Redirects to success message after deleting flower", async () => {
  const id = (await saveDummyFlower())._id;
  const { getRenderInformation } = await emulateCallingController(
    delete_post,
    { body: { flowerId: id }, params: { name: "name" } },
    {}
  );

  const { view, locals } = getRenderInformation();

  expect(view).toMatchInlineSnapshot(`"message"`);
  expect(locals).toMatchInlineSnapshot(`
    {
      "message": "name deleted successfully",
      "title": "name deleted!",
    }
  `);
});
