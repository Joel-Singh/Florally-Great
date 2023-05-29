const asyncHandler = require('express-async-handler')
const path = require('path')
const Region = require(path.join(appRoot, 'models', 'region.js'))

module.exports = asyncHandler(async (req, res, next) => {
  await Region.findByIdAndDelete(req.body.region)

  res.status(200).send("Region successfully deleted!")
})
