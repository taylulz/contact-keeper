// login authentication and route to check logged in user
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route     GET api/auth
// @descrip   Get logged in User
// @access    Private 
router.get('/', auth, async (req, res) => {
  try {
    // Get user from db
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route     POST api/auth
// @descrip   Login and authenticate user & get token
// @access    Public
router.post('/', 
[
  check('email', 'Please include valid email').isEmail(),
  check('password', 'Password is required').exists()
], async (req, res) => {
  const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      // if no user with this email, send this message
      if(!user){
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      // if there is a user, continue to check password (we've only checked email)
      const isMatch = await bcrypt.compare(password, user.password);

      if(!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(payload, config.get('jwtSecret'), {
        expiresIn: 36000,
      }, (err, token) => {
        //if possible error, throw it...
        if(err) throw err;
        //if not, respond with token
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});

module.exports = router;