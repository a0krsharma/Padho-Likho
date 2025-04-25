// Simple script to test the registration API with a unique email
const http = require('http');

// Generate a unique email using timestamp
const uniqueEmail = `test.student.${Date.now()}@example.com`;

// Test data for student registration with unique email
const studentData = {
  firstName: 'Test',
  lastName: 'Student',
  email: uniqueEmail,
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

// Convert data to JSON string
const postData = JSON.stringify(studentData);

// Options for the HTTP request
const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/auth/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

console.log('Testing student registration with unique email...');
console.log('Using email:', uniqueEmail);
console.log('Request data:', postData);

// Create the request
const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  
  let responseData = '';
  
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  
  res.on('end', () => {
    console.log('Response received:');
    try {
      const parsedData = JSON.parse(responseData);
      console.log(JSON.stringify(parsedData, null, 2));
    } catch (e) {
      console.log('Could not parse response as JSON:');
      console.log(responseData);
    }
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

// Write data to request body
req.write(postData);
req.end();
