const express = require('express');
const router = express.Router();
const adsController = require('../controllers/ads.controller.js');

// get requests
router.route('/ads').get(adsController.getAll);
router.route('/ads/:id').get(adsController.getById);
router.route('/ads/search/:searchPhrase').get(adsController.searchAdd)

// post requests
router.route('/ads').post(adsController.addNew);

// put requests
router.route('/ads/:id').put(adsController.updateAdd)

// delete requests
router.route('/ads/:id').delete(adsController.deleteAdd);