// CRUD functionality. Specific to User
const express = require('express');
const router = express.Router();

// @route     GET api/contacts
// @descrip   Get all user's contacts
// @access    Private 
router.get('/', (req, res) => {
  res.send('Get all contacts');
});

// @route     POST api/contacts
// @descrip   Add new contacts
// @access    Private 
router.post('/', (req, res) => {
  res.send('Add a contact');
});

// @route     PUT api/contacts/:id (specifies which contact to update)
// @descrip   Update a contact
// @access    Private 
router.put('/:id', (req, res) => {
  res.send('Update a contact');
});

// @route     DELETE api/contacts/:id
// @descrip   Delete a contact
// @access    Private 
router.delete('/:id', (req, res) => {
  res.send('Delete a contact');
});

module.exports = router; 