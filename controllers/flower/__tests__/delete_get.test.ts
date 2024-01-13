import saveDummyFlower from "../../../utils/dummyData/savingDummyDataToDb/saveDummyFlower";
import emulateCallingController from "../../testingUtils/emulateCallingController";
import delete_get from "../delete_get";

test("Passes in all flowers", async () => {
  await saveDummyFlower();
  await saveDummyFlower();
  await saveDummyFlower();
  await saveDummyFlower();

  const { getRenderInformation } = await emulateCallingController(
    delete_get,
    {},
    {}
  );
  const { locals } = getRenderInformation();

  expect(locals).toMatchInlineSnapshot(`
    {
      "flower_list": [
        {
          "_id": "000000000000000000000004",
          "name": "Name1",
        },
        {
          "_id": "000000000000000000000016",
          "name": "Name13",
        },
        {
          "_id": "000000000000000000000008",
          "name": "Name5",
        },
        {
          "_id": "000000000000000000000012",
          "name": "Name9",
        },
      ],
      "title": "Pick a flower to delete",
    }
  `);
});
