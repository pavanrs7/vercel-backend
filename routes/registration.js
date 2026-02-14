const express = require('express');
const router = express.Router();
const { registerStudent, getRegistrations } = require('../controllers/registrationController');

// POST /api/register - Create new registration
router.post('/', registerStudent);

// GET /api/register - Get all registrations
router.get('/', getRegistrations);

module.exports = router;