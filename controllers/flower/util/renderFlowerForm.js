const path = require('path')
const asyncHandler = require('express-async-handler')
const Region = require(path.join(appRoot, 'models', 'region.js'))

module.exports = asyncHandler(async function(res, next, viewContext) {
  const allRegionNames = await getAllRegionNames(next)

  res.render('flowers/flower_form', {
    ...viewContext,
    regionList: allRegionNames,
  })
})

const getAllRegionNames = async function() {
  const allRegions = await Region.find({}, 'name').exec()
  return allRegions
}
