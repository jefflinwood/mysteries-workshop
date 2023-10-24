const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// In-memory storage for witness details
const witnesses = {};

// Logic Bug: This route does not properly handle the addition of new witnesses.
// Instead, it overwrites the witness details if the same ID is used.
app.post('/witness', (req, res) => {
  const { id, name, statement } = req.body;

  // Incorrectly overwriting witness details
  witnesses[id] = { name, statement };

  res.status(200).send('Witness details saved!');
});

app.get('/witness/:id', (req, res) => {
  const { id } = req.params;

  if (!witnesses[id]) {
    return res.status(404).send('Witness not found');
  }

  res.json(witnesses[id]);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
