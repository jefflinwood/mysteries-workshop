const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Setup database
let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the SQLite database.');
});

db.serialize(() => {
  db.run("CREATE TABLE suspects (id INT PRIMARY KEY, name TEXT, lastSeen TEXT, notes TEXT)");
});

// Error: This route does not ensure the suspect data is always saved due to a lack of error handling and a poorly written db statement
app.post('/suspect', (req, res) => {
  const { name, lastSeen, notes } = req.body;

  const query = `INSERT INTO suspects(name, lastSeen, notes) VALUES (${name}, ${lastSeen}, ${notes})`;

  db.run(query, (err) => {
    if (err) {
      console.error(err.message);
      // Missing error handling here, so users might assume data is saved even when it's not
    }
    res.status(200).send('Suspect data saved!');
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
