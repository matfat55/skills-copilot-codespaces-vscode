// create web server
const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const fs = require('fs');

// enable cors
app.use(cors());

// parse application/json
app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// serve static files from public directory
app.use(express.static('public'));

// read comments from file
function readComments() {
  const data = fs.readFileSync('comments.json');
  return JSON.parse(data);
}

// write comments to file
function writeComments(comments) {
  fs.writeFileSync('comments.json', JSON.stringify(comments, null, 2));
}

// get comments
app.get('/comments', (req, res) => {
  const comments = readComments();
  res.json(comments);
});

// post comment
app.post('/comments', (req, res) => {
  const comments = readComments();
  const comment = req.body;
  comments.push(comment);
  writeComments(comments);
  res.json(comment);
});

// delete comment
app.delete('/comments/:id', (req, res) => {
  const comments = readComments();
  const id = req.params.id;
  const index = comments.findIndex((comment) => comment.id === id);
  if (index !== -1) {
    comments.splice(index, 1);
    writeComments(comments);
    res.json({ message: 'Comment deleted' });
  } else {
    res.status(404).json({ message: 'Comment not found' });
  }
});

// update comment
app.put('/comments/:id', (req, res) => {
  const comments = readComments();
  const id = req.params.id;
  const index = comments.findIndex((comment) => comment.id === id);
  if (index !== -1) {
    comments[index] = req.body;
    writeComments(comments);
    res.json(req.body);
  } else {
    res.status(404).json({ message: 'Comment not found' });
  }
});

// start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}
