const express = require('express');
const { check, validationResult } = require('express-validator');
const bycrpt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/default');
const auth = require('../middleware/auth');

// route auth/
// access  private
// desc  get user
router.get('/', auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    return res.status(500).send('Server Error');
  }
});

// route auth/signup
// access  public
// desc  signup user
router.post(
  '/signup',
  [
    check('first_name', 'First name is requried').not().isEmpty(),
    check('last_name', 'Last name is requried').not().isEmpty(),
    check('city', 'City is requried').not().isEmpty(),
    check('mob', 'Mobile no. is requried').not().isEmpty(),
    check('email', 'Email is requried').not().isEmpty(),
    check('email', 'Invalid email.').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
  ],
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ msg: err.array() });
    }
    try {
      const { first_name, last_name, city, mob, email, password } = req.body;
      //check for existing user
      let user_check = await User.findOne({ $or: [{ email }, { mob }] });
      if (user_check) {
        return res.status(400).send('User already exists.');
      }

      let user = {
        first_name,
        last_name,
        city,
        mob,
        email,
      };
      // hash pass
      const salt = await bycrpt.genSalt(10);
      const hashed = await bycrpt.hash(password, salt);
      user.password = hashed;

      // create user
      const newUser = new User(user);
      await newUser.save();

      // prepare jwt
      const payload = {
        user: {
          id: newUser.id,
        },
      };
      jwt.sign(
        payload,
        config.jwtKey,
        {
          expiresIn: '10h',
        },
        (err, token) => {
          if (err) throw err;
          return res.json({ token });
        }
      );
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
    }
  }
);

// route auth/login
// access public
// desc login user
router.post(
  '/login',
  [
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Invalid Email').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
  ],
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ msg: err.array() });
    }
    try {
      const { email, password } = req.body;
      const check = await User.findOne({ email });
      if (!check) {
        return res.status(400).send('User does not exists.');
      }
      const pass = await bycrpt.compare(password, check.password);
      if (!pass) {
        return res.status(401).send('Invalid username or password');
      }
      const payload = {
        user: {
          id: check._id,
        },
      };
      jwt.sign(payload, config.jwtKey, { expiresIn: '10h' }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error.');
    }
  }
);

module.exports = router;
