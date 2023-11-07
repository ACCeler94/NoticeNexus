const Add = require('../models/Add.model');
const User = require('../models/User.model');
const getImageFileType = require('../utils/getImageFileType');
const deleteImage = require('../utils/deleteImage');


// get requests
exports.getAll = async (req, res) => {
  try {
    const add = await Add.find().populate({
      path: 'seller',
      model: User
    })

    res.json(add);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

exports.getById = async (req, res) => {
  try {
    const add = await Add.findById(req.params.id).populate({ path: 'seller', model: User });

    if (add) {
      res.json(add)
    } else {
      res.status(404).json('No element with this id was found!')
    };

  } catch (error) {
    res.status(500).json({ message: error });
  }
}

exports.searchAdd = async (req, res) => {
  try {
    const filteredAds = await Add.find({ title: { $regex: req.params.searchPhrase, $options: 'i' } });
    res.json(filteredAds);

  } catch (error) {
    res.status(500).json({ message: error });
  }
}

// post requests
exports.newAdd = async (req, res) => {
  try {
    const { title, desc, date, photo, price, location, seller } = req.body;

    const newAdd = new Add({ title, desc, date, photo, price, location, seller });
    await newAdd.save();
    res.json({ message: 'OK', newAdd })
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

// put requests
exports.updateAdd = async (req, res) => {
  try {
    const { title, desc, date, price, location } = req.body;
    const addToUpdate = await Add.findById(req.params.id);
    let photo;

    if (addToUpdate) {
      if (req.file) { // check if add update includes new image
        try {
          const fileType = await getImageFileType(req.file);
          if (['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) { // check image format
            photo = req.file.filename; // add new image to the add
            deleteImage(addToUpdate.photo); // delete old image
          } else {
            photo = addToUpdate.photo; // assign old image to photo
          }
        } catch (error) {
          return res.status(500).json({ message: 'Error determining image file type.' });
        }
      }

      // Update fields if they exist in the request
      if (title) addToUpdate.title = title;
      if (desc) addToUpdate.desc = desc;
      if (date) addToUpdate.date = date;
      if (price) addToUpdate.price = price;
      if (photo) addToUpdate.photo = photo;
      if (location) addToUpdate.location = location;

      await addToUpdate.save();
      res.json({ message: 'OK' })
    } else {
      res.status(404).json('No Add with this id was found!')
    }

  } catch (error) {
    res.status(500).json({ message: error });
  }
};


// delete requests
exports.deleteAdd = async (req, res) => {
  try {
    const addToDelete = await Add.findById(req.params.id);

    if (addToDelete) {
      await Add.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' })
    } else {
      res.status(404).json('No Add with this id was found!')
    }

  } catch (error) {
    res.status(500).json({ message: error });
  }
}