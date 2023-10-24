const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// Setup database
let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the in-memory SQLite database.');
});

db.serialize(() => {
  db.run("CREATE TABLE clues (id INT, detail TEXT)");
  let stmt = db.prepare("INSERT INTO clues VALUES (?, ?)");
  for (let i = 0; i < 1000; i++) {
    stmt.run(i, `Clue #${i}`);
  }
  stmt.finalize();
});

// Bug: This route fetches ALL clues first, and then filters them.
// This is inefficient and can be greatly optimized.
app.get('/clues', (req, res) => {
  const { id } = req.query;

  db.all('SELECT * FROM clues', [], (err, rows) => {
    if (err) {
      throw err;
    }
    const filteredRows = rows.filter(row => row.id == id); // Notice the inefficient filtering
    res.json(filteredRows);
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
