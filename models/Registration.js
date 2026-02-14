const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full Name is required'],
    trim: true,
    maxlength: [100, 'Full Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone Number is required'],
    trim: true,
    match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number']
  },
  priorExperience: {
    type: String,
    enum: ['Yes', 'No'],
    required: [true, 'Prior experience is required']
  },
  previousGuruName: {
    type: String,
    trim: true,
    maxlength: [100, 'Guru Name cannot exceed 100 characters'],
    required: function() { return this.priorExperience === 'Yes'; },
  },
  yearsLearnt: {
    type: Number,
    min: [0, 'Years learnt cannot be negative'],
    max: [50, 'Years learnt cannot exceed 50'],
    required: function() { return this.priorExperience === 'Yes'; },
  },
  learningLevel: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: [true, 'Learning Level is required']
  },
  message: {
    type: String,
    trim: true,
    maxlength: [500, 'Message cannot exceed 500 characters'],
  },
  registrationDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Registration', registrationSchema);