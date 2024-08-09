const axios = require('axios');

const baseURL = 'http://localhost:3000/api';

// Function to test the POST /api/menu endpoint
async function testAddMenuItem() {
  try {
    const response = await axios.post(`${baseURL}/menu-items`, {
      name: 'Test Item',
      description: 'Test Description',
      price: 10.99
    });
    console.log('POST /api/menu response:', response.data);
  } catch (error) {
    console.error('Error testing POST /api/menu:', error.response ? error.response.data : error.message);
  }
}

// Function to test the GET /api/menu endpoint
async function testGetMenuItems() {
  try {
    const response = await axios.get(`${baseURL}/menu`);
    console.log('GET /api/menu response:', response.data);
  } catch (error) {
    console.error('Error testing GET /api/menu:', error.response ? error.response.data : error.message);
  }
}

// Run the tests
async function runTests() {
  await testAddMenuItem();
  await testGetMenuItems();
}

runTests();