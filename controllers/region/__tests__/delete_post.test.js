const path = require('path')

const express = require("express");

const Region = require(path.join(appRoot, 'models', 'region.js'))
const Flower = require(path.join(appRoot, 'models', 'flower.js'))

const sendFormData = require(path.join(appRoot, 'controllers', 'simulateRequestsForTests', 'sendFormData.js'))

const addGeneralMiddleware = require(path.join(appRoot, 'appMiddlewares', 'addGeneralMiddleware.js'))
const viewEngineSetup = require(path.join(appRoot, 'appMiddlewares', 'viewEngineSetup.js'))

const { JSDOM } = require('jsdom')

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

  test("Renders form with error", async () => {
    const id = await saveRegionToBeDeleted()

    const flowerInRegion = new Flower({
      name: 'Flower',
      description: 'desc',
      price: '32',
      numberInStock: '1',
      region: id
    })

    await flowerInRegion.save()

    const response = await sendFormData(app, '/', { region: id})
    const html = convertStringToDOM(response.text)

    expect(html.querySelector('form')).toMatchSnapshot()
  })

  test("Form after error rerender still renders with regions", async () => {
    const id = await saveRegionToBeDeleted()

    const flowerInRegion = new Flower({
      name: 'Flower',
      description: 'desc',
      price: '32',
      numberInStock: '1',
      region: id
    })

    await flowerInRegion.save()

    const regionShouldShowUp = new Region({
      name: 'I should be in the snapshot!',
      description: "Hello! you should see this!",
      _id: "647cbdb6ec4dd230927acfdf"
    })

    await regionShouldShowUp.save()

    const response = await sendFormData(app, '/', { region: id})
    const html = convertStringToDOM(response.text)

    expect(html.querySelector('form')).toMatchSnapshot()
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
    description: "I'm gonna be deleted!",
    _id: '647cbde08678de7aaf63d2ec'
  })

  const regionToBeDeletedDoc = await regionToBeDeleted.save()
  const id = regionToBeDeletedDoc._id

  return id
}

function convertStringToDOM(string) {
  const dom = new JSDOM(string);
  const document = dom.window.document;

  return document
}
