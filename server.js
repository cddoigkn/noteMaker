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

const express = require('express');
const fs = require("fs");

const path = require('path');

const app = express();

const PORT = 3001;

// app.use(express.static('public'));


app.get('/test', (req, res) => res.send('Navigate to /send or /routes'));

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/api/notes', async (req, res) => {
  const noteData = await fs.readFile(path.join(__dirname, "./db/db.json"))
  res.json(noteData)
});

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
