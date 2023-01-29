const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  DOP: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  cost_price: {
    type: String,
    required: true,
  },
  sell_price: {
    type: String,
    required: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
});

module.exports = Item = mongoose.model('item', ItemSchema);
