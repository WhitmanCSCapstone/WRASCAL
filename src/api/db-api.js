const db = require('./db.js');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 3000;

const app = express();
app.set("case sensitive routing", true);

app.use(cors({
  origin: 'http://localhost:5000'
}));

app.use(express.json());

app.get('/api/getByLigand/', db.getByLigand);

app.get('/api/getByAdvSearch', db.getByAdvSearch);

app.get('/api/getConstants', db.getConstants);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })
