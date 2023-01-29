const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  mob: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: 'String',
    requried: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  buy: [
    {
      ItemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'item',
      },
      cost_price: {
        type: String,
      },
      title: {
        type: String,
      },
    },
  ],
  sell: [
    {
      ItemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'item',
      },
    },
  ],
});

module.exports = User = mongoose.model('user', UserSchema);
