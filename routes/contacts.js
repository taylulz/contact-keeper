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
      res.status(500).send('Server Error');
    }
});

// @route     PUT api/contacts/:id (specifies which contact to update)
// @descrip   Update a contact
// @access    Private 
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  // Build a contact object based on fields submitted
  const contactFields = {};
  if(name) contactFields.name = name;
  if(email) contactFields.email = email;
  if(phone) contactFields.phone = phone;
  if(type) contactFields.type = type;

  try {
    // Since we have the /:id in route, we access through req.params
    let contact = await Contact.findById(req.params.id);

    if(!contact) return res.status(404).json({ msg: 'contact not found' });

    // need to make sure it's the user's contact
    if(contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // now find by id and make the update
    contact = await Contact.findByIdAndUpdate(req.params.id, 
      { $set: contactFields },
      { new: true });

      res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error'); 
  }
});

// @route     DELETE api/contacts/:id
// @descrip   Delete a contact
// @access    Private 
router.delete('/:id', auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if(!contact) return res.status(404).json({ msg: 'contact not found' });

    if(contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Don't use findByIdAndDelete because that's depricated
    await Contact.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Contact removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error'); 
  }
});


module.exports = router; 