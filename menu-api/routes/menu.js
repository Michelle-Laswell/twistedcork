const express = require('express');
const path = require('path');
const Database = require('better-sqlite3'); // Ensure you have the correct database module
const router = express.Router();
const dbPath = path.resolve(__dirname, '../data/twistedcork.db');

// Open the database
let db;
try {
    db = new Database(dbPath);
    console.log('Connected to the database.');
} catch (err) {
    console.error('Error opening database:', err.message);
}

// Middleware to parse form data
router.use(express.urlencoded({ extended: true }));
router.use(express.json()); // Added this to parse JSON bodies

// Login route
router.post('/login', (req, res) => {
    const { email, pswd } = req.body;
    console.log('Received login request:', { email, pswd }); // Log received data

    const query = 'SELECT * FROM customers WHERE email = ? AND pswd = ?';

    try {
        const row = db.prepare(query).get(email, pswd);
        console.log('Query result:', row); // Log query result
        
        if (row) {
            res.redirect('/paymentForm.html');
        } else {
            res.redirect('/registrationForm.html');
        }
    } catch (err) {
        console.error('Error querying database:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;