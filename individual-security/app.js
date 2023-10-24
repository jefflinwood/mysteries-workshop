const express = require('express');
const sqlite3 = require('sqlite3');
const app = express();

const SECRET_API_KEY = 'MY-SECRET-API-KEY-12345';


const db = new sqlite3.Database('bears.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the SQLite database.');
    db.run('CREATE TABLE IF NOT EXISTS bears (id INTEGER PRIMARY KEY, name TEXT, species TEXT, location TEXT)');
  }
});

app.use(express.json());

app.get('/bears', (req, res) => {
  db.all('SELECT * FROM bears', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ bears: rows });
  });
});

app.post('/bears', (req, res) => {
  const { name, species, location } = req.body;
  db.run('INSERT INTO bears (name, species, location) VALUES (?, ?, ?)', [name, species, location], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: this.lastID });
  });
});

app.get('/bear-photos', (req, res) => {
    console.log(`Making a Bear Photos API call with key: ${SECRET_API_KEY}`);
    res.json({ message: 'Bear Photo data retrieved successfully!' });
});
  
app.get('/search-bears', (req, res) => {
    const name = req.query.name;
    db.all(`SELECT * FROM bears WHERE name LIKE '%${name}%'`, [], (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ bears: rows });
    });
  });
  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
