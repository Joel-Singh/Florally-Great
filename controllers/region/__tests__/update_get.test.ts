import emulateCallingController from "../../testingUtils/emulateCallingController";
import update_get from "../update_get";
import saveDummyRegion from "../../../utils/dummyData/savingDummyDataToDb/saveDummyRegion";

test("Renders region form, passing in prepopulated values", async () => {
  const region = await saveDummyRegion();
  const { getRenderInformation } = await emulateCallingController(update_get, {
    params: {
      name: region.name,
    },
  });

  const { view, locals } = getRenderInformation();

  expect(view).toMatchInlineSnapshot(`"regions/region_form_update"`);

  expect(locals.prepopulatedValues).toMatchInlineSnapshot(`
    {
      "description": "description",
      "id": "000000000000000000000002",
      "name": "name1",
    }
  `);
});
