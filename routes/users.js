const express = require('express');
const router = express.Router();

// Dummy data
let users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' }
];

// GET /users
router.get('/', (req, res) => {
  res.json(users);
});

// POST /users
router.post('/', (req, res) => {
  const user = { id: Date.now(), ...req.body };
  users.push(user);
  res.status(201).json(user);
});

// PATCH /users/:id
router.patch('/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (user) {
    Object.assign(user, req.body);
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// DELETE /users/:id
router.delete('/:id', (req, res) => {
  users = users.filter(u => u.id != req.params.id);
  res.status(204).end();
});

module.exports = router;

