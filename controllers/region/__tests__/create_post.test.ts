import Region from "../../../models/region";
import getValidRegionData from "../../../utils/dummyData/getValidData/getValidRegionData";
import { snapshotWithoutId } from "../../commonTestUtil/snapshotWithoutId";
import emulateCallingController from "../../testingUtils/emulateCallingController";
import create_post from "../create_post";

test("Redirects and saves region with valid data", async () => {
  const { getRedirectInformation } = await emulateCallingController(
    create_post,
    {
      body: getValidRegionData(),
    }
  );

  const savedRegion = (await Region.find({}))[0];
  snapshotWithoutId(savedRegion, "Region saved");
  expect(getRedirectInformation()).toMatchSnapshot("Correct Redirect");
});

test("Renders region form with errors with invalid data", async () => {
  const { getRenderInformation } = await emulateCallingController(create_post, {
    body: {
      ...getValidRegionData(),
      name: "",
    },
  });

  expect(await Region.find({})).toStrictEqual([]);

  const {
    view,
    locals: { errors },
  } = getRenderInformation();

  expect(errors.length).toBeGreaterThanOrEqual(1);
  expect(view).toMatchInlineSnapshot(`"regions/region_form"`);
});

test("When rendering with error, renders previous inputs", async () => {
  const { getRenderInformation } = await emulateCallingController(create_post, {
    body: {
      ...getValidRegionData(),
      name: "",
    },
  });

  expect(await Region.find({})).toStrictEqual([]);
  const {
    locals: { prepopulatedValues },
  } = getRenderInformation();

  expect(prepopulatedValues).toMatchInlineSnapshot(`
    {
      "description": "Description",
      "name": "",
    }
  `);
});
