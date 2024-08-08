const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const path = require('path');

// Log the start of the script
console.log('Starting hash_passwords.js script');

// Connect to SQLite database
const dbPath = path.join('C:', 'Users', 'mlasw', 'OneDrive', 'Documents', '03_Web Design', 'twistedcork', 'data', 'twistedcork.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Could not connect to database', err);
  } else {
    console.log('Connected to database');
  }
});

// Function to hash passwords and update the database
const hashAndUpdatePasswords = () => {
  console.log('Running hashAndUpdatePasswords function');
  const query = 'SELECT id, pswd_hash FROM customers';
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Error querying database', err);
      return;
    }

    console.log(`Found ${rows.length} rows`);

    rows.forEach((row) => {
      bcrypt.hash(row.pswd_hash, 10, (err, hash) => {
        if (err) {
          console.error('Error hashing password', err);
          return;
        }

        const updateQuery = 'UPDATE customers SET pswd_hash = ? WHERE id = ?';
        db.run(updateQuery, [hash, row.id], (err) => {
          if (err) {
            console.error('Error updating password', err);
          } else {
            console.log(`Password for user ID ${row.id} updated successfully`);
          }
        });
      });
    });
  });
};

hashAndUpdatePasswords();