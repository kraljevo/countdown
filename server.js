const express = require('express');

const app = express();

app.get('/api/eventData', (req, res) => {
  const eventData = [
    {id: 1, eventDate: undefined, eventTime: undefined}
  ];

  res.json(eventData);
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);