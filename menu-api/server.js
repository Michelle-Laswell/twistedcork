const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package

const app = express();
const port = 3000;

// Use the cors middleware
app.use(cors());

app.use(bodyParser.json());

let menuItems = [
	// Weekly Specials
	{ id: 3, name: "Steak & Cheese w/Loaded Fries", description: "Weekly Specials", price: 12.00 },
	{ id: 4, name: "Deluxe Burger w/Bacon", description: "Weekly Specials", price: 10.00 },
	{ id: 5, name: "6 Piece Wings", description: "Weekly Specials", price: 8.00 },
	{ id: 6, name: "12 Piece Wings", description: "Weekly Specials", price: 15.00 },
	// Appetizers
	{ id: 1, name: 'Mozzarella Sticks', description: 'Custom made crispy, golden-brown mozzarella sticks served with our Marinara dipping sauce.', price: 8.00 },
	{ id: 2, name: 'Pepperjack Cheese Poppers', description: 'Handbreaded crispy, golden-brown pepperjack cheese poppers served with our Diablo sauce.', price: 7.00 },
	{ id: 3, name: 'Beer Cheese', description: 'Homemade creamy beer cheese served with celery, pretzels and crackers.', price: 8.00 },
	// Loaded Fries
	{ id: 4, name: 'Classic Loaded Fries', description: 'Handcut French Fries topped with all the classic toppings.', price: 8.00 },
	{ id: 5, name: 'Spicy Loaded Fries', description: 'Handcut French Fries topped with all the classic toppings plus jalapenos served with our diablo sauce.', price: 8.00 },
	{ id: 6, name: 'BBQ Chicken Loaded Fries', description: 'Handcut French Fries topped with BBQ chicken tenders, onion, cheese served with ranch sauce.', price: 10.00 },
	// Entrees
	{ id: 7, name: 'Fried Chicken Salad', description: 'Large salad made with fresh lettuce topped with fresh tomatoes, onion, cheese, egg, bacon bits and crispy fried chicken tenders served with your choice of Ranch, Italian, Bleu Cheese or Honey Mustard.', price: 10.00 },
	{ id: 8, name: 'The Cork Club', description: 'Classic Club Sandwich made with toasted white bread, packed with layers of succulent ham and tender turkey topped with melted American and Swiss cheese, juicy tomato, fresh lettuce, tangy onion and crispy bacon bits served with your choice of fries or side salad.', price: 9.00 },
	{ id: 9, name: 'Buffalo Chicken Quesadilla', description: 'Tangy Buffalo Chicken in a quesadilla with shredded cheese and onion served with your choice of fries or side salad.', price: 12.00 },
	// Burgers
	{ id: 10, name: 'Classic Cheeseburger', description: 'A classic cheeseburger on a toasted bun with your choice of American, Cheddar, or Swiss Cheese with fresh toppings of lettuce, tomato, onion and pickles served with your choice of fries or side salad.', price: 11.00 },
	{ id: 11, name: 'Bourbon Burger', description: 'A juicy beef patty with a sweet and savory sauce made with bourbon, bacon and caramelized onions topped with melted American Cheese and deep fried onion crisps on a toasted bun served with your choice of fries or side salad.', price: 13.00 },
	{ id: 12, name: 'Sweet Slaw Burger', description: 'A perfectly seasoned grilled beef patty topped with Swiss Cheese and a generous serving of crispy, spicy chili mayo coleslaw and crispy fried onion on a toasted bun served with your choice of fries or side salad.', price: 13.00 },
	// Desserts
	{ id: 13, name: 'Mini Fried Apple Pies', description: '3 bite-sized treats filled with a sweet and spicy apple filling served warm and sprinkled with brown sugar.', price: 7.00 },
	{ id: 14, name: 'Mini Fried Oreo Pies', description: 'Crunchy and creamy Oreo pies drizzled with chocolate served warm and sprinkled with powdered sugar.', price: 7.00 },
	// Drinks
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

app.get('/api/menu', (req, res) => {
	console.log('GET /api/menu');
	res.json(menuItems);
});

app.post('/api/menu', (req, res) => {
	console.log('POST /api/menu');
	console.log('Request body:', req.body);
	const newItem = req.body;
	if (!newItem || !newItem.name || !newItem.description || !newItem.price) {
		console.error('Invalid item data:', newItem);
		return res.status(400).send({ message: 'Invalid item data' });
	}
	newItem.id = menuItems.length ? menuItems[menuItems.length - 1].id + 1 : 1; // Ensure unique ID
	menuItems.push(newItem);
	console.log('New item added:', newItem);
	res.status(201).json(newItem);
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});