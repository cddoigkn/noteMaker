/* 
  application needs an import for db.json file using fs module
  HTML ROUTES
  create GET /notes html route for returning the notes.html file 
  create GET * html route for returning the index.html file 
  API ROUTES
  GET /api/notes reads db.json
  then returns all saved notes as JSON
  POST /api/notes receives new note from ui
  then writes note to db.json
  then returns the new note to the ui
*/
const uuid = require("uuid");
const express = require('express');
const fs = require("fs");
const { readFromFile, readAndAppend } = require('./helpers/fsUtils');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// heroku PORT 
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));


app.get('/test', (req, res) => res.send('Navigate to /send or /routes'));

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/api/notes', async (req, res) => {
  readFromFile('./db/db.json').then((noteData) => res.json(JSON.parse(noteData)));
});

app.post('/api/notes', (req, res) => {
  console.info(`${req.method} request received to add a note`);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuid.v4(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully`);
  } else {
    res.error('Error in adding note');
  }
});

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
