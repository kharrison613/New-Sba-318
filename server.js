const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./middleware/logger');

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(logger);

app.get('/', (req, res) => {
  res.render('index');
});


app.use('/users', require('./routes/users'));
app.use('/posts', require('./routes/posts'));
app.use('/comments', require('./routes/comments'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
