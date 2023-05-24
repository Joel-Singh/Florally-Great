const path = require('path')
const Region = require(path.join(appRoot, 'models', 'region.js'))

module.exports = async function(res, next, viewContext) {
  const allRegions = await getAllRegions(next)

  res.render('flowers/flower_form', {
    ...viewContext,
    regionList: allRegions,
  })
}

const getAllRegions = async function(next) {
  try {
    const allRegions = await Region.find({}, 'name').exec()
    return allRegions
  } catch (error) {
    next(error)
  }
}
