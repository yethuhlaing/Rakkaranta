const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST']
}));
app.use(express.static('public'));

app.use((req, res, next) => {
  const apiKey = req.headers['group_e'];
  if (apiKey === 'secret_key') {
    next();
  } else {
    res.status(401).send('Unauthorized: Invalid API key');
  }
});

let temperatures = [];

app.post('/temperature', (req, res) => {
  const temperature = req.body.value;
  if (temperature === undefined) {
    return res.status(400).send('Invalid data: "value" is required');
  }
  if (typeof temperature !== 'number') {
    return res.status(400).send('Invalid data: "value" must be a number');
  }
  temperatures.push(temperature);
  res.status(201).send('Temperature added');
});

app.get('/temperature', (req, res) => {
  res.json(temperatures);
});

app.delete('/temperature', (req, res) => {
  temperatures = [];
  res.send('All temperature data deleted');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});