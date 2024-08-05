const Database = require('better-sqlite3');
const path = require('path');

// Path to your SQLite database in the data folder
const dbPath = path.join(__dirname, 'data', 'twistedcork.db');
const db = new Database(dbPath);

// Create the menu_items table
db.exec(`
	CREATE TABLE IF NOT EXISTS menu_items (
		id INTEGER PRIMARY KEY,
		name TEXT NOT NULL,
		description TEXT NOT NULL,
		price REAL NOT NULL,
		category TEXT,
		glassPrice REAL
	)
`);

// Create the customers table
db.exec(`
	CREATE TABLE IF NOT EXISTS customers (
		id INTEGER PRIMARY KEY,
		firstName TEXT NOT NULL,
		lastName TEXT NOT NULL,
		email TEXT NOT NULL
	)
`);

// Sample data for menu_items
const menuItems = [
	{ id: 1, name: 'Item 1', description: 'Description 1', price: 10.0, category: 'Category 1', glassPrice: 5.0 },
	{ id: 2, name: 'Item 2', description: 'Description 2', price: 15.0, category: 'Category 2', glassPrice: 7.5 },
	// Add more items as needed
];

// Insert sample data into menu_items table
const insertMenuItem = db.prepare(`
	INSERT OR REPLACE INTO menu_items (id, name, description, price, category, glassPrice)
	VALUES (?, ?, ?, ?, ?, ?)
`);

menuItems.forEach(item => {
	insertMenuItem.run(item.id, item.name, item.description, item.price, item.category || null, item.glassPrice || null);
});

console.log('Database initialized successfully.');