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
          "id": "000000000000000000000004",
          "name": "Name1",
          "url": "/flowers/Name1",
        },
        {
          "id": "000000000000000000000016",
          "name": "Name13",
          "url": "/flowers/Name13",
        },
        {
          "id": "000000000000000000000008",
          "name": "Name5",
          "url": "/flowers/Name5",
        },
        {
          "id": "000000000000000000000012",
          "name": "Name9",
          "url": "/flowers/Name9",
        },
      ],
      "title": "Pick a flower to delete",
    }
  `);
});
