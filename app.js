const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Set view engine to EJS
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Temporary in-memory store
let posts = [];

// Routes
app.get('/', (req, res) => {
  res.render('home', { posts });
});

app.get('/new', (req, res) => {
  res.render('new');
});

app.post('/create', (req, res) => {
  const { title, content } = req.body;
  posts.push({ id: Date.now(), title, content });
  res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (!post) return res.status(404).send('Post not found');
  res.render('edit', { post });
});

app.post('/update/:id', (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (!post) return res.status(404).send('Post not found');
  post.title = req.body.title;
  post.content = req.body.content;
  res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
  posts = posts.filter(p => p.id != req.params.id);
  res.redirect('/');
});


app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
