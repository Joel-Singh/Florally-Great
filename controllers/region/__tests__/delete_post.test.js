const path = require("path");

const express = require("express");

const Region = require(path.join(appRoot, "models", "region.js"));
const Flower = require(path.join(appRoot, "models", "flower.js"));
const formatHtml = require("../../testingUtils/formatHtml.js");

const emulateCallingController = require("../../testingUtils/emulateCallingController.js");

const sendFormData = require(path.join(
  appRoot,
  "controllers",
  "testingUtils",
  "sendFormData.js"
));

const configureExpressApp = require(path.join(
  appRoot,
  "appMiddlewares",
  "configureExpressApp"
));

const convertStringToDOM = require(path.join(
  appRoot,
  "controllers",
  "testingUtils",
  "convertStringToDOM.js"
));

const delete_post = require("../delete_post");

let app;
beforeAll(async () => {
  app = configureExpressApp({
    viewEngine: true,
    generalMiddleware: true,
  });

  app.use("/", delete_post);
});

test("If no region is selected, error message is returned", async () => {
  const { fakeRes, getRenderInformation } = await emulateCallingController(
    delete_post,
    {
      body: { regionId: undefined },
    }
  );

  const { view, locals } = getRenderInformation(fakeRes);

  expect(view).toMatchInlineSnapshot(`"regions/delete_region"`);
  expect(locals.errors).toMatchInlineSnapshot(`
    [
      {
        "msg": "Please select a region",
      },
    ]
  `);
});

describe("On region without a flower", () => {
  test("Region is deleted", async () => {
    const id = await saveRegionToBeDeleted();

    await emulateCallingController(delete_post, {
      body: { regionId: id },
    });

    const foundRegion = await Region.findById(id).exec();
    expect(foundRegion).toBeNull();
  });

  test("Renders form again", async () => {
    const id = await saveRegionToBeDeleted();

    const { fakeRes } = await emulateCallingController(delete_post, {
      body: { regionId: id },
    });

    const redirectedPage = fakeRes.redirect.mock.calls[0][0];
    expect(redirectedPage).toMatchInlineSnapshot(`"/regions/delete"`);
  });
});

describe("On region with a flower", () => {
  test("Region isn't deleted when it has flower", async () => {
    const id = await saveRegionWithFlower();

    await emulateCallingController(delete_post, {
      body: { regionId: id },
    });

    const foundRegion = await Region.findById(id).exec();
    expect(foundRegion).not.toBeNull();
  });

  test("Renders Error, hyperlinking to flower", async () => {
    const id = await saveRegionWithFlower();

    const { fakeRes, getRenderInformation } = await emulateCallingController(
      delete_post,
      {
        body: { regionId: id },
      }
    );

    const { locals } = getRenderInformation(fakeRes);

    const errorMsg = locals.errors[0].msg;
    expect(formatHtml(errorMsg)).toMatchSnapshot();
  });

  test("Form after error rerender still renders with regions", async () => {
    const id = await saveRegionWithFlower();

    const regionShouldShowUp = new Region({
      name: "I should be in the snapshot!",
      description: "Hello! you should see this!",
      _id: "647cbdb6ec4dd230927acfdf",
    });

    await regionShouldShowUp.save();

    const { fakeRes, getRenderInformation } = await emulateCallingController(
      delete_post,
      {
        body: { regionId: id },
      }
    );

    const { locals } = getRenderInformation(fakeRes);

    expect(locals.all_regions).toMatchSnapshot();
  });
});

describe("On region with multiple flowers", () => {
  test("Renders error, hyperlinking to multiple flowers", async () => {
    const id = await saveRegionToBeDeleted();

    await addFlowerToRegion("Flower 1", id);
    await addFlowerToRegion("Flower 2", id);
    await addFlowerToRegion("Flower 3", id);

    const { fakeRes, getRenderInformation } = await emulateCallingController(
      delete_post,
      {
        body: { regionId: id },
      }
    );

    const { locals } = getRenderInformation(fakeRes);

    const errorMsg = locals.errors[0].msg;
    expect(formatHtml(errorMsg)).toMatchSnapshot();

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

describe("From deleting through region detail page", () => {
  test("If region doesn't have flowers, deletes region and redirects with success message", async () => {
    const id = await saveRegionToBeDeleted();
    const { fakeRes, getRenderInformation } = await emulateCallingController(
      delete_post,
      {
        body: {
          regionId: id,
          fromRegionDetailPage: true,
        },
      }
    );

    const { view, locals } = getRenderInformation(fakeRes);

    const foundRegion = await Region.findById(id).exec();
    expect(foundRegion).toBeNull();

    expect(view).toMatchInlineSnapshot(`"message"`);
    expect(locals).toMatchInlineSnapshot(
      `
      {
        "message": "Region successfully deleted",
        "title": "success!",
      }
    `
    );
  });

  test("If region does have flowers, don't delete region and redirect with error", async () => {
    const id = await saveRegionWithFlower();
    const { fakeRes, getRenderInformation } = await emulateCallingController(
      delete_post,
      {
        body: {
          regionId: id,
          fromRegionDetailPage: true,
        },
      }
    );

    const { view, locals } = getRenderInformation(fakeRes);

    const foundRegion = await Region.findById(id).exec();
    expect(foundRegion).not.toBeNull();

    expect(view).toMatchInlineSnapshot(`"message"`);
    expect(locals).toMatchInlineSnapshot(
      `
      {
        "message": "Region not deleted",
        "title": "failure!",
      }
    `
    );
  });
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
