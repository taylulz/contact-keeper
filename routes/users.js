// going to have register route
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

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
  (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    res.send('passed')
  }
);


module.exports = router; 