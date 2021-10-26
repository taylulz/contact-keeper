// going to have register route
const { genSalt } = require('bcryptjs');
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

// @route     POST api/users (because server.js tells it to come here)
// @descrip   Register a user
// @access    Public (it's to register to become user)
router.post(
  '/',
  [
  check('name', 'Please include name')
    .not()
    .isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password w/ 6+ chars').isLength({ min: 6 })
  ], 
  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // desctructure from req.body 
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      // if user already exists
      if(user) {
        return res.status(400).json({ msg: 'user already exists'});
      }

      // if user doesn't already exist
      user = new User({
        name, 
        email,
        password
      });

      // before saving to db, need to hash the password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      res.send('User saved');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);


module.exports = router; 