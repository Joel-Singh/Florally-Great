const path = require('path')
const Region = require(path.join(appRoot, 'models', 'region.js'))

module.exports = async (res, locals) => {
  const allRegions =
    await Region.find({}, 'name').exec()

  res.render('regions/delete_region',  {
    all_regions: allRegions,
    ...locals
  })
}
