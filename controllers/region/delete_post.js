const asyncHandler = require('express-async-handler')
const path = require('path')
const Region = require(path.join(appRoot, 'models', 'region.js'))
const Flower = require(path.join(appRoot, 'models', 'flower.js'))

module.exports = asyncHandler(async (req, res, next) => {
  const regionId = req.body.region

  if (! await regionHasFlower(regionId)) {
    await Region.findByIdAndDelete(req.body.region)
    res.redirect('regions/delete')
  } else {
    const allRegions =
      await Region.find({}, 'name').exec()

    res.render('regions/delete_region',  {
      errors: [{ msg: "Region already has a flower"}],
      all_regions: allRegions
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
