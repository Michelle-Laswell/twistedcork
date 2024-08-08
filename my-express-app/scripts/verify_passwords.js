const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Connect to SQLite database
const dbPath = path.join('C:', 'Users', 'mlasw', 'OneDrive', 'Documents', '03_Web Design', 'twistedcork', 'data', 'twistedcork.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Could not connect to database', err);
  } else {
    console.log('Connected to database');
  }
});

// Function to verify hashed passwords
const verifyHashedPasswords = () => {
  console.log('Running verifyHashedPasswords function');
  const query = 'SELECT id, pswd_hash FROM customers';
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Error querying database', err);
      return;
    }

    console.log(`Found ${rows.length} rows`);

    rows.forEach((row) => {
      console.log(`User ID: ${row.id}, Hashed Password: ${row.pswd_hash}`);
    });
  });
};

verifyHashedPasswords();