const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  title: { type: String, required: true, minLength: 10, maxLength: 50 },
  desc: { type: String, required: true, minLength: 20, maxLength: 1000 },
  date: { type: String, required: true },
  photo: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});


module.exports = mongoose.model('Ad', adSchema);