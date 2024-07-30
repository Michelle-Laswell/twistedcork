const express = require('express');
const bcrypt = require('bcrypt');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to SQLite database
const db = new sqlite3.Database('./customers.db');

app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    res.status(400).send('Email and password are required');
    return;
  }

  // Query the database for the user
  db.get('SELECT pswd_hash FROM customers WHERE email = ?', [email], (err, row) => {
    if (err) {
      console.error('Database error', err);
      res.status(500).send('Internal server error');
      return;
    }

    if (!row) {
      res.status(401).send('Invalid email or password');
      return;
    }

    const hashedPassword = row.pswd_hash;
    console.log('Received password:', password);
    console.log('Hashed password from database:', hashedPassword);

    bcrypt.compare(password, hashedPassword, (err, result) => {
      if (err) {
        console.error('Error comparing passwords', err);
        res.status(500).send('Internal server error');
        return;
      }

      if (result) {
        // Passwords match
        res.redirect('/paymentForm');
      } else {
        // Passwords do not match
        res.status(401).send('Invalid email or password');
      }
    });
  });
});

// Payment form route
app.get('/paymentForm', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'paymentForm.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});