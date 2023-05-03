const express = require("express");
const router = express.Router();

const regionController = require('../controllers/region')
const flower_and_region_controller = require('../controllers/flower_and_region')

router.get('/', regionController.region_list)

router.get('/create', regionController.region_create_get)
router.post('/create', regionController.region_create_post)

router.get('/create', regionController.region_create_get)
router.post('/create', regionController.region_create_post)

router.get('/:name', regionController.region_detail)
router.get('/:name/update', regionController.region_update_get)
router.post('/:name/update', regionController.region_update_post)

module.exports = router
