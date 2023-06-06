const asyncHandler = require('express-async-handler')
const path = require('path')
const Region = require(path.join(appRoot, 'models', 'region.js'))
const Flower = require(path.join(appRoot, 'models', 'flower.js'))
const renderDeleteRegion = require('./rendersWithDefaultLocals/renderDeleteRegion.js')

module.exports = asyncHandler(async (req, res, next) => {
  const regionId = req.body.region

  if (! await regionHasFlower(regionId)) {
    await Region.findByIdAndDelete(regionId)
    res.redirect('regions/delete')
  } else {
    const flowersOfRegion = await Flower.find({ region: regionId}).exec()
    const errors = flowersOfRegion.map((flower) => {
      return ({
        msg: `Region has flowers, delete them first: <a href="${flower.url}">${flower.name}</a>`
      })
    })

    renderDeleteRegion(res, {
      errors
    })
  }
})

async function regionHasFlower(regionId) {
  const flower = await Flower.findOne({ region: regionId}).exec()
  if (flower === null)
    return false
  else
    return true
}
