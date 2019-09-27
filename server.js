const express = require('express');

const app = express();

let userInput = {
  eventDate: new Date(),
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
};

app.get('/api/eventData', (req, res) => {
  res.json(userInput);
});

app.post('/api/eventData', (req, res) => {
  console.log('POST request received.');
  console.log(userInput);
  res.json(userInput = req.body);
  console.log(userInput);
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);