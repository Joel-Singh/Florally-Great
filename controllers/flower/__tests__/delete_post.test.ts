import emulateCallingController from "../../testingUtils/emulateCallingController.ts";

import saveDummyFlower from "../../../utils/dummyData/savingDummyDataToDb/saveDummyFlower.ts";

import Flower from "../../../models/flower.ts";

import delete_post from "../delete_post.ts";

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
