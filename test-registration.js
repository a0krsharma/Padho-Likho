const axios = require('axios');

// Test data for student registration
const studentData = {
  firstName: 'Test',
  lastName: 'Student',
  email: 'test.student@example.com',
  password: 'password123',
  role: 'student',
  phone: '1234567890',
  address: '123 Test St',
  city: 'Test City',
  state: 'Test State',
  zipCode: '12345',
  country: 'Test Country',
  class: '5',
  subjects: ['Math', 'Science']
};

// Test data for teacher registration
const teacherData = {
  firstName: 'Test',
  lastName: 'Teacher',
  email: 'test.teacher@example.com',
  password: 'password123',
  role: 'teacher',
  phone: '9876543210',
  address: '456 Test Ave',
  city: 'Test City',
  state: 'Test State',
  zipCode: '54321',
  country: 'Test Country',
  qualifications: 'PhD in Education',
  experience: '5',
  subjects: ['Math', 'Physics']
};

// Test data for parent registration
const parentData = {
  firstName: 'Test',
  lastName: 'Parent',
  email: 'test.parent@example.com',
  password: 'password123',
  role: 'parent',
  phone: '5555555555',
  address: '789 Test Blvd',
  city: 'Test City',
  state: 'Test State',
  zipCode: '67890',
  country: 'Test Country'
};

// Function to test registration
async function testRegistration(userData) {
  console.log(`Testing registration for ${userData.role}...`);
  console.log('Registration data:', JSON.stringify(userData, null, 2));
  
  try {
    const response = await axios.post('http://localhost:5000/api/auth/register', userData);
    console.log('Registration successful!');
    console.log('Response:', JSON.stringify(response.data, null, 2));
    return true;
  } catch (error) {
    console.error('Registration failed!');
    if (error.response) {
      console.error('Error response:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error('Error:', error.message);
    }
    return false;
  }
}

// Run tests
async function runTests() {
  console.log('=== REGISTRATION TESTS ===');
  
  // Test student registration
  console.log('\n--- STUDENT REGISTRATION TEST ---');
  await testRegistration(studentData);
  
  // Test teacher registration
  console.log('\n--- TEACHER REGISTRATION TEST ---');
  await testRegistration(teacherData);
  
  // Test parent registration
  console.log('\n--- PARENT REGISTRATION TEST ---');
  await testRegistration(parentData);
  
  console.log('\n=== TESTS COMPLETED ===');
}

// Run the tests
runTests();
