const asyncHandler = require('express-async-handler')
const path = require('path')
const Region = require(path.join(appRoot, 'models', 'region.js'))

module.exports = asyncHandler(async (req, res, next) => {
  const allRegions = await Region.find({}, 'name description url')
    .sort({ name: 1 })
    .exec()

  res.render('regions/all_regions', { region_list: allRegions, title: 'All Regions'})
})

