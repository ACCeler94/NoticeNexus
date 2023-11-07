const express = require('express');
const router = express.Router();
const adsController = require('../controllers/ads.controller.js');


// get requests
router.route('/ads').get(adsController.getAll);
router.route('/ads/:id').get(adsController.getById);
router.route('/ads/search/:searchPhrase').get(adsController.searchAdd)

// post requests
router.post('/ads', adsController.newAdd);

// put requests
router.put('/ads/:id', adsController.updateAdd)

// delete requests
router.delete('/ads/:id', adsController.deleteAdd);

module.exports = router;