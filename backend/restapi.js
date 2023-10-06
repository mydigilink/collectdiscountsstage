const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Sample data (replace with your own data or database)
const users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
];

// Endpoint to get all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// Endpoint to get a specific user by ID
app.get('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);

  if (!user) {
    res.status(404).json({ message: 'User not found' });
  } else {
    res.json(user);
  }
});

// Endpoint to create a new user
app.post('/api/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// Endpoint to update an existing user
app.put('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);

  if (!user) {
    res.status(404).json({ message: 'User not found' });
  } else {
    user.name = req.body.name;
    res.json(user);
  }
});

// Endpoint to delete a user by ID
app.delete('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    res.status(404).json({ message: 'User not found' });
  } else {
    users.splice(userIndex, 1);
    res.status(204).send();
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});