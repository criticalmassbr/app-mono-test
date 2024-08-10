const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let users = [];

app.get('/users', (req, res) => res.json(users));
app.post('/users', (req, res) => {
  users.push(req.body);
  res.status(201).json(req.body);
});

app.listen(port, () => console.log(`API running on http://localhost:${port}`));
