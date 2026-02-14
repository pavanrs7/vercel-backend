const express = require('express');
const router = express.Router();
const {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact
} = require('../controllers/contactController');

// Routes
router.route('/')
  .get(getContacts)      // GET /api/contacts - Get all contacts
  .post(createContact);  // POST /api/contacts - Create new contact

router.route('/:id')
  .get(getContact)       // GET /api/contacts/:id - Get single contact
  .put(updateContact)    // PUT /api/contacts/:id - Update contact status
  .delete(deleteContact); // DELETE /api/contacts/:id - Delete contact

module.exports = router;