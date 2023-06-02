const path = require('path')

const express = require("express");

const Region = require(path.join(appRoot, 'models', 'region.js'))
const Flower = require(path.join(appRoot, 'models', 'flower.js'))

const sendFormData = require(path.join(appRoot, 'controllers', 'simulateRequestsForTests', 'sendFormData.js'))

const addGeneralMiddleware = require(path.join(appRoot, 'appMiddlewares', 'addGeneralMiddleware.js'))
const viewEngineSetup = require(path.join(appRoot, 'appMiddlewares', 'viewEngineSetup.js'))

const delete_post = require('../delete_post')

let app;

beforeAll(async () => {
  app = configureExpressApp()
})

describe('On region without a flower', () => {
  test("Region is deleted", async () => {
    const id = await saveRegionToBeDeleted()

    await sendFormData(app, '/', { region: id})

    const foundRegion = await Region.findById(id).exec()
    expect(foundRegion).toBeNull()
  });

  test("Renders form again", async () => {
    const id = await saveRegionToBeDeleted()

    const response = await sendFormData(app, '/', { region: id})

    expect(response.text).toMatchInlineSnapshot(`"Found. Redirecting to regions/delete"`)
  });

})

describe('On region with a flower', () => {
  test("Region isn't deleted when it has flower", async () => {
    const id = await saveRegionToBeDeleted()

    const flowerInRegion = new Flower({
      name: 'Flower',
      description: 'desc',
      price: '32',
      numberInStock: '1',
      region: id
    })

    await flowerInRegion.save()

    await sendFormData(app, '/', { region: id})

    const foundRegion = await Region.findById(id).exec()
    expect(foundRegion).not.toBeNull()
  })
})

function configureExpressApp() {
  const app = express();

  viewEngineSetup(app)
  addGeneralMiddleware(app)

  app.use("/", delete_post);

  return app
}

async function saveRegionToBeDeleted() {
  const regionToBeDeleted = new Region({
    name: 'Region Name',
    description: "I'm gonna be deleted!"
  })

  const regionToBeDeletedDoc = await regionToBeDeleted.save()
  const id = regionToBeDeletedDoc._id

  return id
}
