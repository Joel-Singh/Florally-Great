const asyncHandler = require('express-async-handler')
const path = require('path')
const Region = require(path.join(appRoot, 'models', 'region.js'))

module.exports = asyncHandler(async (req, res, next) => {
  const allRegions =
    await Region.find({}, 'name').exec()

  res.render('regions/delete_region.pug', {
    all_regions: allRegions
  })
})
