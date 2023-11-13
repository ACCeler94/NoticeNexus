const Ad = require('../models/Ad.model');
const User = require('../models/User.model');
const getImageFileType = require('../utils/getImageFileType');
const deleteImage = require('../utils/deleteImage');


// get requests
exports.getAll = async (req, res) => {
  try {
    const ad = await Ad.find().populate({
      path: 'seller',
      model: User,
      select: '-password' // exclude 'password'
    })

    res.json(ad);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

exports.getById = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id).populate({ path: 'seller', model: User });

    if (ad) {
      res.json(ad)
    } else {
      res.status(404).json('No element with this id was found!')
    };

  } catch (error) {
    res.status(500).json({ message: error });
  }
}

exports.searchAd = async (req, res) => {
  try {
    const filteredAds = await Ad.find({ title: { $regex: req.params.searchPhrase, $options: 'i' } });
    res.json(filteredAds);

  } catch (error) {
    res.status(500).json({ message: error });
  }
}

// post requests
exports.newAd = async (req, res) => {
  const { title, desc, date, price, location, seller } = req.body;
  let fileType = 'unknown';

  try {
    if (req.file) { // check for photo and it's type
      try {
        fileType = await getImageFileType(req.file);
      } catch (error) {
        return res.status(500).json({ message: 'Error determining image file type.' });
      }
    }
    if (title && typeof title === 'string' && desc && typeof desc === 'string' && date && typeof date === 'string' && price && typeof price === 'string' && location && typeof location === 'string' && seller && typeof seller === 'string' && req.file && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) {
      const newAd = new Ad({ title, desc, date, photo: req.file.filename, price, location, seller });
      await newAd.save();
      res.json({ message: 'OK', newAd })
    } else {
      deleteImage(req.file.filename); // delete image if validation fails
      res.status(400).json({ message: 'Bad request, validation failed' });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

// put requests
exports.updateAd = async (req, res) => {
  try {
    const { title, desc, date, price, location } = req.body;
    const adToUpdate = await Ad.findById(req.params.id);
    let photo;

    if (adToUpdate) {
      if (req.file) { // check if ad update includes new image
        try {
          const fileType = await getImageFileType(req.file);
          if (['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) { // check image format
            photo = req.file.filename; // add new image to the ad
            deleteImage(adToUpdate.photo); // delete old image
          } else {
            photo = adToUpdate.photo; // assign old image to photo
          }
        } catch (error) {
          return res.status(500).json({ message: 'Error determining image file type.' });
        }
      }

      // Update fields if they exist in the request
      if (title) adToUpdate.title = title;
      if (desc) adToUpdate.desc = desc;
      if (date) adToUpdate.date = date;
      if (price) adToUpdate.price = price;
      if (photo) adToUpdate.photo = photo;
      if (location) adToUpdate.location = location;

      await adToUpdate.save();
      res.json({ message: 'OK', adToUpdate })
    } else {
      res.status(404).json('No Ad with this id was found!')
    }

  } catch (error) {
    res.status(500).json({ message: error });
  }
};


// delete requests
exports.deleteAd = async (req, res) => {
  try {
    const adToDelete = await Ad.findById(req.params.id);

    if (adToDelete) {
      await Ad.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' })
    } else {
      res.status(404).json('No Ad with this id was found!')
    }

  } catch (error) {
    res.status(500).json({ message: error });
  }
}