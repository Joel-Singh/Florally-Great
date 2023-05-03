const express = require('express');
const router = express.Router();
const flowerAndRegionController = require('../controllers/flowerAndRegion')

/* GET home page. */
router.get('/', flowerAndRegionController.index);

module.exports = router;
