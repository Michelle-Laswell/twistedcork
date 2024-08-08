const Database = require('better-sqlite3');
const path = require('path');

// Path to your SQLite database
const dbPath = path.join(__dirname, 'data', 'twistedcork.db');
const db = new Database(dbPath);

try {
	const query = 'SELECT * FROM orders';
	const orders = db.prepare(query).all();
	console.log('Orders:', orders);
} catch (err) {
	console.error('Database error:', err);
}