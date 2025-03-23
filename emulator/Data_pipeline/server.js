const express = require('express');
const app = express();

// Allow parsing JSON request body
app.use(express.json());

app.use(express.static('public'));

// Store temperature data in memory array
let temperatures = [];

// POST endpoint: Receive temperature data
app.post('/temperature', (req, res) => {
  const temperature = req.body.value;
  if (temperature !== undefined) {
    temperatures.push(temperature);
    res.status(201).send('Temperature added');
  } else {
    res.status(400).send('Invalid data: "value" is required');
  }
});

// GET endpoint: Return all temperature data
app.get('/temperature', (req, res) => {
  res.json(temperatures);
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});