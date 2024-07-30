const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt'); // Import bcrypt

const app = express();
const PORT = 3000;

// Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Connect to SQLite database
const dbPath = path.join('C:', 'Users', 'mlasw', 'OneDrive', 'Documents', '03_Web Design', 'twistedcork', 'data', 'twistedcork.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Could not connect to database', err);
  } else {
    console.log('Connected to database');
  }
});

// Route to serve the login form
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'loginForm.html'));
});

// Handle form submission
app.post('/login', (req, res) => {
  const { email, password, remember } = req.body;

  // Query the database to check credentials
  const query = 'SELECT * FROM customers WHERE email = ?';
  db.get(query, [email], (err, row) => {
    if (err) {
      console.error('Error querying database', err);
      res.status(500).send('Internal server error');
    } else if (row) {
      // Compare the hashed password
      bcrypt.compare(password, row.password_hash, (err, result) => {
        if (result) {
          // Credentials are valid, serve the payment form
          res.sendFile(path.join(__dirname, 'public', 'paymentForm.html'));
        } else {
          // Invalid credentials
          res.status(401).send('Invalid email or password');
        }
      });
    } else {
      // Invalid credentials
      res.status(401).send('Invalid email or password');
    }
  });
});

// Example route to register a new user (hashing the password)
app.post('/register', (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  // Hash the password before storing it
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error('Error hashing password', err);
      res.status(500).send('Internal server error');
    } else {
      const query = 'INSERT INTO customer (first_name, last_name, email, password_hash) VALUES (?, ?, ?, ?)';
      db.run(query, [first_name, last_name, email, hash], (err) => {
        if (err) {
          console.error('Error inserting into database', err);
          res.status(500).send('Internal server error');
        } else {
          res.send('User registered successfully');
        }
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});