const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const Database = require('better-sqlite3');
const app = express();
const port = 3000;

// Path to your SQLite database
const dbPath = path.join(__dirname, 'data', 'twistedcork.db');
const db = new Database(dbPath);

// Use the cors middleware
app.use(cors());

// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '..', 'public')));

// Import routes
const menuRoutes = require('./routes/menu');

// Use routes
app.use('/api', menuRoutes);

// Serve menu.html
app.get('/menu', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'menu.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

let menuItems = [
    // Your menu items here...
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

// Handle login form and open payment form
app.post('/api/login', (req, res) => {
    console.log('POST /api/login');
    const { email, pswd } = req.body;

    if (!email || !pswd) {
        console.log('Email or password missing');
        return res.status(400).send({ message: 'Email and password are required' });
    }

    try {
        const query = 'SELECT * FROM customers WHERE email = ? AND pswd = ?';
        const customer = db.prepare(query).get(email, pswd);

        if (customer) {
            // Credentials are valid
            console.log('Login successful for email:', email);
            res.status(200).json({ customerId: customer.id });
        } else {
            // Invalid credentials
            console.log('Invalid credentials for email:', email);
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).send({ message: 'Internal server error' });
    }
});

// Handle registration form submission
app.post('/api/register', (req, res) => {
    console.log('POST /api/register');
    const { firstName, lastName, email, pswd } = req.body;

    if (!firstName || !lastName || !email || !pswd) {
        console.log('All fields are required');
        return res.status(400).send({ message: 'All fields are required' });
    }

    try {
        const query = 'INSERT INTO customers (firstName, lastName, email, pswd) VALUES (?, ?, ?, ?)';
        const stmt = db.prepare(query);
        stmt.run(firstName, lastName, email, pswd);
        console.log('New customer registered:', { firstName, lastName, email });
        res.redirect('/loginForm.html');
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).send({ message: 'Internal server error' });
    }
});

// Handle order placement
app.post('/api/orders', (req, res) => {
    console.log('POST /api/orders');
    const { cart, customerId } = req.body;
    const orderDate = new Date().toISOString().split('T')[0];

    const insertOrder = db.prepare(`
        INSERT INTO orders (customerId, menuItemId, menuItemName, quantity, orderDate)
        VALUES (?, ?, ?, ?, ?)
    `);

    cart.forEach(item => {
        insertOrder.run(customerId, item.id, item.name, 1, orderDate);
    });

    res.status(200).json({ message: 'Order placed successfully' });
});