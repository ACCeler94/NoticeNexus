const Add = require('../models/Add.model');
const User = require('../models/User.model')

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
// [TODO] handle searchAdd get request

// post requests
exports.addNew = async (req, res) => {
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
    const { title, desc, date, photo, price, location, seller } = req.body;
    const AddToUpdate = Add.findById(req.params.id);

    if (AddToUpdate) {
      await Add.updateOne({ _id: req.params.id }, { $set: { title, desc, date, photo, price, location, seller } })
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