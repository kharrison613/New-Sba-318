const express = require('express');
const router = express.Router();

// Dummy data
let posts = [
  { id: 1, title: 'First Post', content: 'This is the first post.' },
  { id: 2, title: 'Second Post', content: 'This is the second post.' }
];

// GET /posts
router.get('/', (req, res) => {
  res.json(posts);
});

// POST /posts
router.post('/', (req, res) => {
  const post = { id: Date.now(), ...req.body };
  posts.push(post);
  res.status(201).json(post);
});

// PATCH /posts/:id
router.patch('/:id', (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (post) {
    Object.assign(post, req.body);
    res.json(post);
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
});

// DELETE /posts/:id
router.delete('/:id', (req, res) => {
  posts = posts.filter(p => p.id != req.params.id);
  res.status(204).end();
});

module.exports = router;
