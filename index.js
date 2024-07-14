const express = require('express');
const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Route for the homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


//DEFINING ROUTES
app.get('/index', (req, res) => {
  res.send('This is the home page.');
});

app.get('/menu', (req, res) => {
  res.send('This is the menu page.');
});

app.get('/events', (req, res) => {
  res.send('This is the event page.');
});






