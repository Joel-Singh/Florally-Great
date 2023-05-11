const express = require("express");
const router = express.Router();

const regionController = require('../controllers/region')
const flowerAndRegionController = require('../controllers/flowerAndRegion')

router.get('/', regionController.region_list)

router.get('/create', regionController.region_create_get)
router.post('/create', regionController.region_create_post)

router.get('/create', regionController.region_create_get)
router.post('/create', regionController.region_create_post)

router.get('/:name', flowerAndRegionController.all_flowers_in_region)
router.get('/:name/update', regionController.region_update_get)
router.post('/:name/update', regionController.region_update_post)

module.exports = router
