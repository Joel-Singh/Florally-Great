const emulateCallingController = require("../../testingUtils/emulateCallingController.js");
const create_post = require("../create_post.js");
const getValidFlowerPostData = require("../../testingUtils/dummyData/getValidFlowerPostData.js");
const Flower = require("../../../models/flower.js");

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

function snapshotWithoutId(document, snapshotName) {
  document = document.toObject();
  delete document._id;
  expect(document).toMatchSnapshot(snapshotName);
}
