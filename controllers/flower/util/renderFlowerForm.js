const path = require('path')
const asyncHandler = require('express-async-handler')
const Region = require(path.join(appRoot, 'models', 'region.js'))

module.exports = asyncHandler(async function(res, next, viewContext) {
  const allRegions = await getAllRegions(next)

  res.render('flowers/flower_form', {
    ...viewContext,
    regionList: allRegions,
  })
})

const getAllRegions = async function() {
  const allRegions = await Region.find({}, 'name').exec()
  return allRegions
}
