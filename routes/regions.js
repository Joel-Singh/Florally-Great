const express = require("express");
const router = express.Router();

const region_controller = require('../controllers/region')
const flower_and_region_controller = require('../controllers/flower_and_region')

router.get('/regions', region_controller.region_list)
router.get('/regions/:name', region_controller.region_detail)

router.get('/regions/create', region_controller.region_create_get)
router.post('/regions/create', region_controller.region_create_post)

router.get('/regions/create', region_controller.region_create_get)
router.post('/regions/create', region_controller.region_create_post)

router.get('/regions/:name/update', region_controller.region_update_get)
router.post('/regions/:name/update', region_controller.region_update_post)

module.exports = router
