const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Registration = require('./models/Registration');

dotenv.config({ path: '.env' }); // Load environment variables from .env

const testRegistrationSubmission = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB for registration testing.');

    // Test data for a new registration
    const testData = {
      fullName: 'Test Student',
      email: 'test.student@example.com',
      phoneNumber: '9876543210',
      priorExperience: 'Yes',
      previousGuruName: 'Test Guru',
      yearsLearnt: 2,
      learningLevel: 'Beginner',
      message: 'Interested in learning more about Mridanga.'
    };

    console.log('🧪 Attempting to create a new registration...');
    console.log('📤 Sending data:', testData);

    const newRegistration = await Registration.create(testData);

    console.log('✅ Registration created successfully!');
    console.log('📄 New Registration:', newRegistration);

    // Test data for a student with no prior experience
    const testDataNoExperience = {
      fullName: 'New Student',
      email: 'new.student@example.com',
      phoneNumber: '1234567890',
      priorExperience: 'No',
      learningLevel: 'Beginner',
      message: 'First time learning Mridanga.'
    };

    console.log('\n🧪 Attempting to create a new registration (no prior experience)...');
    console.log('📤 Sending data:', testDataNoExperience);

    const newRegistrationNoExperience = await Registration.create(testDataNoExperience);

    console.log('✅ Registration (no prior experience) created successfully!');
    console.log('📄 New Registration:', newRegistrationNoExperience);

  } catch (error) {
    console.error('❌ Error during registration test:', error);
  } finally {
    // Disconnect from MongoDB
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
      console.log('👋 Disconnected from MongoDB.');
    }
  }
};

testRegistrationSubmission();