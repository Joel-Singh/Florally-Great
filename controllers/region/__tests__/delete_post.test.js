const path = require("path");

const express = require("express");

const Region = require(path.join(appRoot, "models", "region.js"));
const Flower = require(path.join(appRoot, "models", "flower.js"));

const sendFormData = require(path.join(
  appRoot,
  "controllers",
  "testingUtils",
  "sendFormData.js"
));

const addGeneralMiddleware = require(path.join(
  appRoot,
  "appMiddlewares",
  "addGeneralMiddleware.js"
));
const viewEngineSetup = require(path.join(
  appRoot,
  "appMiddlewares",
  "viewEngineSetup.js"
));

const { JSDOM } = require("jsdom");

const delete_post = require("../delete_post");

let app;
beforeAll(async () => {
  app = configureExpressApp();
});

test("If no region is selected, error message is returned", async () => {
  const response = await sendFormData(app, "/", {});
  const html = convertStringToDOM(response.text);

  expect(html.querySelector('[data-testid="errors"]')).toMatchSnapshot();
})

describe("On region without a flower", () => {
  test("Region is deleted", async () => {
    const id = await saveRegionToBeDeleted();

    await sendFormData(app, "/", { region: id });

    const foundRegion = await Region.findById(id).exec();
    expect(foundRegion).toBeNull();
  });

  test("Renders form again", async () => {
    const id = await saveRegionToBeDeleted();

    const response = await sendFormData(app, "/", { region: id });

    expect(response.text).toMatchInlineSnapshot(
      `"Found. Redirecting to regions/delete"`
    );
  });
});

describe("On region with a flower", () => {
  test("Region isn't deleted when it has flower", async () => {
    const id = await saveRegionWithFlower();

    await sendFormData(app, "/", { region: id });

    const foundRegion = await Region.findById(id).exec();
    expect(foundRegion).not.toBeNull();
  });

  test("Renders Error, hyperlinking to flower", async () => {
    const id = await saveRegionWithFlower();

    const response = await sendFormData(app, "/", { region: id });
    const html = convertStringToDOM(response.text);

    expect(html.querySelector('[data-testid="errors"]')).toMatchSnapshot();
  });

  test("Form after error rerender still renders with regions", async () => {
    const id = await saveRegionWithFlower();

    const regionShouldShowUp = new Region({
      name: "I should be in the snapshot!",
      description: "Hello! you should see this!",
      _id: "647cbdb6ec4dd230927acfdf",
    });

    await regionShouldShowUp.save();

    const response = await sendFormData(app, "/", { region: id });
    const html = convertStringToDOM(response.text);
    const form = html.querySelector("form");
    form.removeChild(form.querySelector('[data-testid="errors"]'));

    expect(form).toMatchSnapshot();
  });

  async function saveRegionWithFlower() {
    const id = await saveRegionToBeDeleted();

    const flowerInRegion = new Flower({
      name: "Flower",
      description: "desc",
      price: "32",
      numberInStock: "1",
      region: id,
    });

    await flowerInRegion.save();

    return id;
  }
});

describe("On region with multiple flowers", () => {
  test("Renders error, hyperlinking to multiple flowers", async () => {
    const id = await saveRegionToBeDeleted();

    await addFlowerToRegion("Flower 1", id);
    await addFlowerToRegion("Flower 2", id);
    await addFlowerToRegion("Flower 3", id);

    const response = await sendFormData(app, "/", { region: id });
    const html = convertStringToDOM(response.text);

    expect(html.querySelector('[data-testid="errors"]')).toMatchSnapshot();

    async function addFlowerToRegion(name, id) {
      const flowerInRegion = new Flower({
        name,
        description: "desc",
        price: "32",
        numberInStock: "1",
        region: id,
      });
      await flowerInRegion.save();
    }
  });
});

function configureExpressApp() {
  const app = express();

  viewEngineSetup(app);
  addGeneralMiddleware(app);

  app.use("/", delete_post);

  return app;
}

async function saveRegionToBeDeleted() {
  const regionToBeDeleted = new Region({
    name: "Region Name",
    description: "I'm gonna be deleted!",
    _id: "647cbde08678de7aaf63d2ec",
  });

  const regionToBeDeletedDoc = await regionToBeDeleted.save();
  const id = regionToBeDeletedDoc._id;

  return id;
}

function convertStringToDOM(string) {
  const dom = new JSDOM(string);
  const document = dom.window.document;

  return document;
}
