// Simple test script to verify the contact API is working
const testContactSubmission = async () => {
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    subject: 'Test Subject',
    message: 'This is a test message from the contact form.'
  };

  try {
    console.log('🧪 Testing contact form submission...');
    console.log('📤 Sending data:', testData);

    const response = await fetch('http://localhost:5000/api/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    const result = await response.json();

    if (result.success) {
      console.log('✅ Contact form submission successful!');
      console.log('📨 Response:', result);
    } else {
      console.log('❌ Contact form submission failed!');
      console.log('📨 Response:', result);
    }
  } catch (error) {
    console.log('❌ Error testing contact form:', error.message);
  }
};

// Test health check
const testHealthCheck = async () => {
  try {
    console.log('🏥 Testing health check...');
    const response = await fetch('http://localhost:5000/api/health');
    const result = await response.json();
    console.log('✅ Health check successful!');
    console.log('📊 Status:', result);
  } catch (error) {
    console.log('❌ Health check failed:', error.message);
  }
};

// Run tests
const runTests = async () => {
  console.log('🚀 Starting backend API tests...\n');

  // Wait a moment for server to start
  setTimeout(async () => {
    await testHealthCheck();
    console.log('\n' + '='.repeat(50) + '\n');
    await testContactSubmission();
    console.log('\n🎉 Tests completed!');
  }, 2000);
};

runTests();