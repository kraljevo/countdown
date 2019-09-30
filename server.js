const express = require('express');
const app = express();
const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
app.use(express.json());

let userInput = {
  eventDate: new Date()
};

app.get('/api/eventData', (req, res) => {
  res.json(userInput);
});

app.post('/api/eventData', (req, res) => {
  console.log('POST request received.');
  userInput = req.body;
  res.json({statusText: 'SUCCESS'});
  console.log(`Response sent: ${userInput.eventDate}`);
});