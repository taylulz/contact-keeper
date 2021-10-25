// going to have register route
const express = require('express');
const router = express.Router();

// @route     POST api/users (because server.js tells it to come here)
// @descrip   Register a user
// @access    Public (it's to register to become user)
router.post('/', (req, res) => {
  res.send('Register a user');
});


module.exports = router; 