// Test registration using built-in fetch API
const fetch = require('node-fetch');

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

// Function to test registration
async function testRegistration(userData) {
  console.log(`Testing registration for ${userData.role}...`);
  console.log('Registration data:', JSON.stringify(userData, null, 2));
  
  try {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('Registration successful!');
      console.log('Response:', JSON.stringify(data, null, 2));
      return true;
    } else {
      console.error('Registration failed!');
      console.error('Error response:', JSON.stringify(data, null, 2));
      return false;
    }
  } catch (error) {
    console.error('Registration failed!');
    console.error('Error:', error.message);
    return false;
  }
}

// Run test
testRegistration(studentData)
  .then(() => console.log('Test completed'))
  .catch(err => console.error('Test error:', err));
