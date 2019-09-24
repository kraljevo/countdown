const express = require('express');

const app = express();

const userInput = [
  {eventDate: undefined, eventTime: undefined}
];

app.post('/api/eventData', (res) => {
  console.log(userInput)
  res.send(userInput);
});

app.get('/api/eventData', (req, res) => {
  console.log(userInput)
  res.send(userInput);
})

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);