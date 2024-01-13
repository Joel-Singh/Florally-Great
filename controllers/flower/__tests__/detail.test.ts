import detail from "../detail.ts";
import emulateCallingController from "../../testingUtils/emulateCallingController.ts";
import saveDummyFlower from "../../../utils/dummyData/savingDummyDataToDb/saveDummyFlower.ts";

test("Passes in flower information to flower detail", async () => {
  const flowerName = "name";
  await saveDummyFlower({ name: flowerName });

  const { getRenderInformation } = await emulateCallingController(detail, {
    params: { name: flowerName },
  });
  const { view, locals } = getRenderInformation();

  expect(view).toMatchInlineSnapshot(`"flowers/flower_detail"`);
  expect(locals).toMatchInlineSnapshot(`
    {
      "description": "Description",
      "flowerId": "000000000000000000000004",
      "flowerUrl": "/flowers/name",
      "name": "name",
      "numberInStock": 32,
      "price": 3.89,
      "region": {
        "_id": "000000000000000000000003",
        "name": "name2",
      },
      "title": "name",
    }
  `);
});
