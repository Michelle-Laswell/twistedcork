const Database = require('better-sqlite3');
const path = require('path');

// Absolute path to your SQLite database
const dbPath = path.join('C:', 'Users', 'mlasw', 'OneDrive', 'Documents', '03_Web Design', 'twistedcork', 'menu-api', 'data', 'twistedcork.db');
const db = new Database(dbPath);

// Example: Query all rows from the 'menu_items' table
const rows = db.prepare('SELECT * FROM menu_items').all();
console.log('Menu Items:', rows);

// Example: Insert a new row into the 'orders' table
const insert = db.prepare('INSERT INTO orders (item, quantity, price) VALUES (?, ?, ?)');
insert.run('Canned Soda', 2, 2.50);

// Example: Query the newly inserted row from the 'orders' table
const orderRows = db.prepare('SELECT * FROM orders').all();
console.log('Orders:', orderRows);