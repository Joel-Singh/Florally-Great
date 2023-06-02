const asyncHandler = require('express-async-handler')
const path = require('path')
const Region = require(path.join(appRoot, 'models', 'region.js'))
const Flower = require(path.join(appRoot, 'models', 'flower.js'))

module.exports = asyncHandler(async (req, res, next) => {
  const regionId = req.body.region

  if (! await regionHasFlower(regionId)) {
    await Region.findByIdAndDelete(req.body.region)
    res.status(200).send("Region successfully deleted!")
  } else {
    res.status(400).send("Region has a flower")
  }
})

async function regionHasFlower(regionId) {
  const flower = await Flower.findOne({ region: regionId}).exec()
  if (flower === null)
    return false
  else
    return true
}
