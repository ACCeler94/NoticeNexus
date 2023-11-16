const express = require('express');
const router = express.Router();
const adsController = require('../controllers/ads.controller.js');
const imageUpload = require('../utils/imageUpload');
const authMiddleware = require('../utils/auth.middleware');


// get requests
router.route('/ads').get(adsController.getAll);
router.route('/ads/:id').get(adsController.getById);
router.route('/ads/search/:searchPhrase').get(adsController.searchAd)

// post requests
router.post('/ads', authMiddleware, imageUpload.single('photo'), adsController.newAd);

// put requests
router.put('/ads/:id', authMiddleware, imageUpload.single('photo'), adsController.updateAd)

// delete requests
router.delete('/ads/:id', adsController.deleteAd);

module.exports = router;