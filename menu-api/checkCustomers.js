const Database = require('better-sqlite3');
const path = require('path');

// Path to your SQLite database
const dbPath = path.join(__dirname, 'data', 'twistedcork.db');
const db = new Database(dbPath);

try {
	const query = 'SELECT * FROM customers';
	const customers = db.prepare(query).all();
	console.log('Customers:', customers);
} catch (err) {
	console.error('Database error:', err);
}