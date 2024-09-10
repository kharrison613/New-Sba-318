const express = require('express');
const router = express.Router();

// Dummy data
let comments = [
  { id: 1, postId: 1, content: 'Great post!' },
  { id: 2, postId: 1, content: 'Thanks for sharing!' }
];

// GET /comments
router.get('/', (req, res) => {
  res.json(comments);
});

// POST /comments
router.post('/', (req, res) => {
  const comment = { id: Date.now(), ...req.body };
  comments.push(comment);
  res.status(201).json(comment);
});

// PATCH /comments/:id
router.patch('/:id', (req, res) => {
  const comment = comments.find(c => c.id == req.params.id);
  if (comment) {
    Object.assign(comment, req.body);
    res.json(comment);
  } else {
    res.status(404).json({ error: 'Comment not found' });
  }
});

// DELETE /comments/:id
router.delete('/:id', (req, res) => {
  comments = comments.filter(c => c.id != req.params.id);
  res.status(204).end();
});

module.exports = router;

