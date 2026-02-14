const Registration = require('../models/Registration');

// @desc    Register new student
// @route   POST /api/register
// @access  Public
const registerStudent = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phoneNumber,
      priorExperience,
      previousGuruName,
      yearsLearnt,
      learningLevel,
      message
    } = req.body;

    // Create registration
    const registration = await Registration.create({
      fullName,
      email,
      phoneNumber,
      priorExperience,
      previousGuruName,
      yearsLearnt,
      learningLevel,
      message
    });

    res.status(201).json({
      success: true,
      message: 'Registration submitted successfully! We will contact you soon.',
      data: registration
    });
  } catch (error) {
    console.error('Error registering student:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get all registrations (for admin use)
// @route   GET /api/register
// @access  Public (should be private in real app)
const getRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({})
      .sort({ registrationDate: -1 })
      .select('-__v');

    res.status(200).json({
      success: true,
      count: registrations.length,
      data: registrations
    });
  } catch (error) {
    console.error('Error fetching registrations:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

module.exports = {
  registerStudent,
  getRegistrations
};