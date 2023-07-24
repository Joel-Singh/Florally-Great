const emulateCallingController = require("../../testingUtils/emulateCallingController.js");
const create_post = require("../create_post.js");
const {
  getValidFlowerPostData,
} = require("../../../utils/dummyData/getValidData/getValidFlowerData.ts");
const { default: Flower } = require("../../../models/flower.ts");

test("Redirects and saves flower with valid data", async () => {
  const { getRedirectInformation } = await emulateCallingController(
    create_post,
    {
      body: await getValidFlowerPostData(),
    }
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

function snapshotWithoutId(document, snapshotName) {
  document = document.toObject();
  delete document._id;
  expect(document).toMatchSnapshot(snapshotName);
}
