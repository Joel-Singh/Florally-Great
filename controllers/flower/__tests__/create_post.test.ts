import create_post from "../create_post";
import { getValidFlowerPostData } from "../../../utils/dummyData/getValidData/getValidFlowerData";
import Flower from "../../../models/flower";
import emulateCallingController from "../../testingUtils/emulateCallingController";
import { Document } from "mongoose";

test("Redirects and saves flower with valid data", async () => {
  const { getRedirectInformation } = await emulateCallingController(
    create_post,
    {
      body: await getValidFlowerPostData(),
    },
  );

  const savedFlower = (await Flower.find({}))[0];
  snapshotWithoutId(savedFlower, "Flower saved");
  expect(getRedirectInformation()).toMatchSnapshot("Correct Redirect");
});

test("Renders flower form with errors with invalid data", async () => {
  const { getRenderInformation } = await emulateCallingController(create_post, {
    body: {
      ...(await getValidFlowerPostData()),
      numberInStock: "Not a number!",
    },
  });

  expect(await Flower.find({})).toStrictEqual([]);

  const {
    view,
    locals: { errors },
  } = getRenderInformation();
  expect(errors.length).toBeGreaterThanOrEqual(1);
  expect(view).toMatchInlineSnapshot(`"flowers/flower_form"`);
});

function snapshotWithoutId(document: Document, snapshotName: string) {
  document = document.toObject();
  delete document._id;
  expect(document).toMatchSnapshot(snapshotName);
}
