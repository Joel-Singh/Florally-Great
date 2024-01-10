import Region, { IRegionDocument } from "../../../models/region";
import saveDummyRegion from "../../../utils/dummyData/savingDummyDataToDb/saveDummyRegion";
import {
  RegionUpdateFormData,
  RegionUpdateFormLocals,
} from "../../../views/regions/regionFormInterfaces";
import emulateCallingController from "../../testingUtils/emulateCallingController";
import update_post from "../update_post";

test("Updates region in db", async () => {
  const dummyRegion: IRegionDocument = (await saveDummyRegion()).toObject({
    versionKey: false,
  });

  const regionPostData: RegionUpdateFormData = {
    name: "newName",
    description: "newDescription",
    id: dummyRegion._id!.toString(),
  };

  await emulateCallingController(update_post, {
    body: {
      ...regionPostData,
    },
  });

  const updatedRegion = (await Region.findById(dummyRegion._id))!;

  expect(updatedRegion).not.toBeNull();
  expect(updatedRegion.name).toBe(regionPostData.name);
  expect(updatedRegion.description).toBe(regionPostData.description);
});

test("Redirects to region on successful update", async () => {
  const dummyRegion: IRegionDocument = await saveDummyRegion();
  const dummyRegionId: string = dummyRegion._id.toString();

  const body: RegionUpdateFormData = {
    name: "newName",
    description: "newDescription",
    id: dummyRegionId,
  };

  const { getRedirectInformation } = await emulateCallingController(
    update_post,
    {
      body,
    }
  );

  const { redirectPage } = getRedirectInformation();

  expect(redirectPage).toBeDefined();
  expect(redirectPage).toMatchInlineSnapshot(`"/regions/newName"`);
});

test("Rerenders form with error on error", async () => {
  const dummyRegion: IRegionDocument = await saveDummyRegion();
  const dummyRegionId: string = dummyRegion._id.toString();
  const invalidName = "";

  const body: RegionUpdateFormData = {
    name: invalidName,
    description: dummyRegion.description,
    id: dummyRegionId,
  };

  const { getRenderInformation } = await emulateCallingController(update_post, {
    body,
  });

  const { view, locals } = getRenderInformation();

  expect(view).toMatchInlineSnapshot(`"regions/region_form_update"`);
  expect(locals.errors).toMatchInlineSnapshot(`
    [
      {
        "location": "body",
        "msg": "Name can't be empty",
        "path": "name",
        "type": "field",
        "value": "",
      },
    ]
  `);
});

test("Rerenders on error with previous data", async () => {
  const dummyRegion: IRegionDocument = await saveDummyRegion();
  const dummyRegionId: string = dummyRegion._id.toString();
  const invalidName = "";

  const body: RegionUpdateFormData = {
    name: invalidName,
    description: dummyRegion.description,
    id: dummyRegionId,
  };

  const { getRenderInformation } = await emulateCallingController(update_post, {
    body,
  });

  const locals: RegionUpdateFormLocals = getRenderInformation().locals;

  expect(locals.prepopulatedValues).toMatchInlineSnapshot(`
    {
      "description": "description",
      "id": "000000000000000000000008",
      "name": "",
    }
  `);
});
