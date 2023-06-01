const path = require('path')
const asyncHandler = require('express-async-handler')
const Region = require(path.join(appRoot, 'models', 'region.js'))

module.exports = asyncHandler(async function(res, next, viewContext) {
  const allRegionNames = await Region.find({}, 'name').exec()

  res.render('flowers/flower_form', {
    ...viewContext,
    regionList: allRegionNames,
  })
})
