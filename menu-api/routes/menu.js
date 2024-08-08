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

// New route to save orders
router.post('/orders', (req, res) => {
	const { customerId, cart } = req.body;
	if (!customerId || !cart || !Array.isArray(cart)) {
		return res.status(400).json({ error: 'Invalid order data' });
	}

	const insertOrder = db.prepare(`
		INSERT INTO orders (customerId, menuItemId, menuItemName, quantity, orderDate)
		VALUES (?, ?, ?, ?, datetime('now'))
	`);

	const transaction = db.transaction((customerId, cart) => {
		cart.forEach(item => {
			insertOrder.run(customerId, item.menuItemId, item.menuItemName, item.quantity);
		});
	});

	try {
		transaction(customerId, cart);
		res.status(201).json({ message: 'Order saved successfully' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to save order' });
	}
});

module.exports = router;