// login authentication and route to check logged in user

const express = require('express');
const router = express.Router();

// @route     GET api/auth
// @descrip   Get logged in User
// @access    Private 
router.get('/', (req, res) => {
  res.send('Get logged in user');
});

// @route     POST api/auth
// @descrip   Login and authenticate user & get token
// @access    Public
router.post('/', (req, res) => {
  res.send('Log in user');
});

module.exports = router;