const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

// Define the full path to the database file
const dbPath = 'C:\\Users\\mlasw\\OneDrive\\Documents\\03_Web Design\\twistedcork\\menu-api\\data\\twistedcork.db';

// Ensure the directory exists
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
	fs.mkdirSync(dbDir, { recursive: true });
}

let db;
if (!fs.existsSync(dbPath)) {
	// Initialize the database if the file does not exist
	db = new Database(dbPath);

	// Create the customers table
	db.exec(`
		CREATE TABLE IF NOT EXISTS customers (
			id INTEGER PRIMARY KEY,
			firstName TEXT NOT NULL,
			lastName TEXT NOT NULL,
			email TEXT NOT NULL,
			pswd TEXT NOT NULL
		)
	`);

	// Create the orders table
	db.exec(`
		CREATE TABLE IF NOT EXISTS orders (
			orderId INTEGER PRIMARY KEY,
			customerId INTEGER NOT NULL,
			menuItemId INTEGER NOT NULL,
			menuItemName TEXT NOT NULL,
			quantity INTEGER NOT NULL,
			orderDate TEXT NOT NULL,
			FOREIGN KEY (customerId) REFERENCES customers(id),
			FOREIGN KEY (menuItemId) REFERENCES menu_items(id)
		)
	`);

	console.log('Database initialized and tables created successfully.');
} else {
	// Open the existing database
	db = new Database(dbPath);
	console.log('Database file already exists.');
}

// Drop the menu_items table if it exists
db.exec(`DROP TABLE IF EXISTS menu_items`);

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

// Sample data for menu_items
const menuItems = [
	{ id: 1, name: 'Mozzarella Sticks', description: 'Custom made crispy, golden-brown mozzarella sticks served with our Marinara dipping sauce.', price: 8.00 },
	{ id: 2, name: 'Pepperjack Cheese Poppers', description: 'Handbreaded crispy, golden-brown pepperjack cheese poppers served with our Diablo sauce.', price: 7.00 },
	{ id: 3, name: 'Beer Cheese', description: 'Homemade creamy beer cheese served with celery, pretzels and crackers.', price: 8.00 },
	{ id: 4, name: 'Classic Loaded Fries', description: 'Handcut French Fries topped with all the classic toppings.', price: 8.00 },
	{ id: 5, name: 'Spicy Loaded Fries', description: 'Handcut French Fries topped with all the classic toppings plus jalapenos served with our diablo sauce.', price: 8.00 },
	{ id: 6, name: 'BBQ Chicken Loaded Fries', description: 'Handcut French Fries topped with BBQ chicken tenders, onion, cheese served with ranch sauce.', price: 10.00 },
	{ id: 7, name: 'Fried Chicken Salad', description: 'Large salad made with fresh lettuce topped with fresh tomatoes, onion, cheese, egg, bacon bits and crispy fried chicken tenders served with your choice of Ranch, Italian, Bleu Cheese or Honey Mustard.', price: 10.00 },
	{ id: 8, name: 'The Cork Club', description: 'Classic Club Sandwich made with toasted white bread, packed with layers of succulent ham and tender turkey topped with melted American and Swiss cheese, juicy tomato, fresh lettuce, tangy onion and crispy bacon bits served with your choice of fries or side salad.', price: 9.00 },
	{ id: 9, name: 'Buffalo Chicken Quesadilla', description: 'Tangy Buffalo Chicken in a quesadilla with shredded cheese and onion served with your choice of fries or side salad.', price: 12.00 },
	{ id: 10, name: 'Classic Cheeseburger', description: 'A classic cheeseburger on a toasted bun with your choice of American, Cheddar, or Swiss Cheese with fresh toppings of lettuce, tomato, onion and pickles served with your choice of fries or side salad.', price: 11.00 },
	{ id: 11, name: 'Bourbon Burger', description: 'A juicy beef patty with a sweet and savory sauce made with bourbon, bacon and caramelized onions topped with melted American Cheese and deep fried onion crisps on a toasted bun served with your choice of fries or side salad.', price: 13.00 },
	{ id: 12, name: 'Sweet Slaw Burger', description: 'A perfectly seasoned grilled beef patty topped with Swiss Cheese and a generous serving of crispy, spicy chili mayo coleslaw and crispy fried onion on a toasted bun served with your choice of fries or side salad.', price: 13.00 },
	{ id: 13, name: 'Mini Fried Apple Pies', description: '3 bite-sized treats filled with a sweet and spicy apple filling served warm and sprinkled with brown sugar.', price: 7.00 },
	{ id: 14, name: 'Mini Fried Oreo Pies', description: 'Crunchy and creamy Oreo pies drizzled with chocolate served warm and sprinkled with powdered sugar.', price: 7.00 },
	{ id: 15, name: 'Bottled Water', description: 'Bottled Water', price: 1.25, category: "togoDrinks" },
	{ id: 16, name: "Canned Soda", description: "Coke, Diet Coke and Sprite", price: 1.25, category: "togoDrinks" },
	{ id: 17, name: "Cutwater Can Cocktails", description: "Award Winning Cocktails made with real Spirits", price: 5.00, category: "togoDrinks" },
	{ id: 18, name: "Domestic Can Beer Singles", description: "Budweiser, Bud Light, Miller and Miller Light", price: 3.50, category: "togoDrinks" },
	{ id: 19, name: "Rhinegeist Can Beer Singles", description: "Craft beers and ciders", price: 5.00, category: "togoDrinks" },
	{ id: 20, name: "Budweiser", description: "Bottled or On-Tap", price: 4.50, category: "domesticBeer" },
	{ id: 21, name: "Bud Light", description: "Bottled or On-Tap", price: 4.50, category: "domesticBeer" },
	{ id: 22, name: "Miller", description: "Bottled or On-Tap", price: 4.50, category: "domesticBeer" },
	{ id: 23, name: "Miller Light", description: "Bottled or On-Tap", price: 4.50, category: "domesticBeer" },
	{ id: 24, name: "Yuenling", description: "Bottled or On-Tap", price: 6.00, category: "craftBeer" },
	{ id: 25, name: "Country Boy", description: "Bottled or On-Tap", price: 6.00, category: "craftBeer" },
	{ id: 26, name: "Shop Top", description: "Bottled or On-Tap", price: 6.00, category: "craftBeer" },
	{ id: 27, name: "Fat Cat Pinot Noir", description: "Bottle", price: 18.00, glassPrice: 6.00, category: "bottledWine" },
	{ id: 28, name: "Fat Cat Chardonay", description: "Bottle", price: 18.00, glassPrice: 6.00, category: "bottledWine" },
	{ id: 29, name: "Nine Fields Cabernet", description: "Bottle", price: 18.00, glassPrice: 6.00, category: "bottledWine" },
	{ id: 30, name: "Crow Canyon Chardonay", description: "Bottle", price: 18.00, glassPrice: 6.00, category: "bottledWine" }
];

// Insert sample data into menu_items table
const insertMenuItem = db.prepare(`
	INSERT INTO menu_items (id, name, description, price, category, glassPrice)
	VALUES (?, ?, ?, ?, ?, ?)
`);

menuItems.forEach(item => {
	insertMenuItem.run(item.id, item.name, item.description, item.price, item.category || null, item.glassPrice || null);
});

console.log('Menu items inserted successfully.');

db.close();