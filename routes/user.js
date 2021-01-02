const express = require('express');
const { check, validationResult } = require('express-validator');
const Item = require('../models/Item');
const User = require('../models/User');

const auth = require('../middleware/auth');

const router = express.Router();

// Route user/sell
// access private
// desc sell item
router.post(
  '/sell',
  [
    auth,
    check('title', 'Product title is required').not().isEmpty(),
    check('DOP', 'Date of purchase is required').not().isEmpty(),
    check('cost_price', 'Cost price is required').not().isEmpty(),
    check('sell_price', 'Selling price is required').not().isEmpty(),
  ],
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ msg: err.array() });
    }
    try {
      const { title, DOP, cost_price, sell_price } = req.body;
      const item = { title, DOP, cost_price, sell_price };
      item.seller = req.user.id;
      if (req.body.desc) {
        item.desc = req.body.desc;
      }
      const user = await User.findById(req.user.id).select(['sell', 'city']);
      item.city = user.city;
      const newItem = new Item(item);

      user.sell.push({ ItemId: newItem.id });

      await newItem.save();
      await user.save();
      return res.json({ newItem });
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
    }
  }
);

// route /user/items
// access  private
// desc get all items
router.get('/items', auth, async (req, res) => {
  try {
    const items = await Item.find({ seller: { $ne: req.user.id } });
    return res.json({ items });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Server Error');
  }
});

// route /user/avail_items
// access  private
// desc get items that you can buy
router.post(
  '/avail_items',
  [auth, check('city', 'City is required').not().isEmpty()],
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ msg: err.array() });
    }
    try {
      const { city } = req.body;
      const items = await Item.find({ city, seller: { $ne: req.user.id } });
      res.json({ items });
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server error');
    }
  }
);

// route /user/:pid/buy
// access  private
// desc buy item
router.put('/:pid/buy', auth, async (req, res) => {
  try {
    // get product
    const prod = await Item.findById(req.params.pid);
    // check if seller != user
    if (prod.seller == req.user.id) {
      return res.status(400).send('You cannot buy your own product!');
    }
    // add product in BUY[] of user
    const user = await User.findById(req.user.id).select('buy');
    user.buy.push({
      ItemId: req.params.pid,
      title: prod.title,
      cost_price: prod.cost_price,
    });

    // remove item from seller's sell[]
    let seller = await User.findById(prod.seller).select('sell');
    let idx = seller.sell
      .map((item) => {
        item.itemID;
      })
      .indexOf(req.params.pid);

    seller.sell.splice(idx, 1);

    await user.save();
    await seller.save();

    // remove product from collection
    await Item.deleteOne({ _id: req.params.pid });

    return res.send('Item bought');
  } catch (error) {
    console.log(error);
    return res.status(500).send('Server Error.');
  }
});

// route /user/avail_items
// access  private
// desc get item by id
router.get('/:pid', auth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.pid);
    return res.json(item);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Server Error.');
  }
});

module.exports = router;
