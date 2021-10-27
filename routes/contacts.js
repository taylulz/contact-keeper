// CRUD functionality. Specific to User
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Contact = require('../models/Contact');

// @route     GET api/contacts
// @descrip   Get all user's contacts
// @access    Private 
router.get('/', auth, async  (req, res) => {
  try {
    // contacts have a user field which is an object id. We want to get contacts for this specific user and since we're using auth middleware we have access to req.user object. Sort by -1 means most recent contacts first
    const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
});

// @route     POST api/contacts
// @descrip   Add new contacts
// @access    Private 
router.post(
  '/', 
  [ 
    auth, 
    [
      check('name', 'Name is required')
        .not()
        .isEmpty()
    ] 
  ], 
  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id
      });

      const contact = await newContact.save();

      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error')
    }
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