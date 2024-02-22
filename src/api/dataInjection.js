// Import necessary modules
const express = require('express');
const { Pool } = require('pg');
const path = require('path'); // Import the 'path' module
const cors = require('cors');

// Create an Express application
const app = express();

// PostgreSQL connection configuration
const pool = new Pool({
  user: 'postgres.eauyarvlibdxezijtoyx',
  host: 'aws-0-us-west-1.pooler.supabase.com',
  database: 'postgres',
  password: 'QQDfWWErfbeYvumh',
  port: 5432,
});

app.use(express.json());
app.use(cors());

// Define the port number
const port = 3003; // Set the port number to 3000 or any other available port

// Route to handle POST request to insert data into the 'metals' table
app.post('/metals', async (req, res) => {
  try {
    console.log(req);
    const { id, metalName, formula_string, charge } = req.body;

    // Insert data into the 'metals' table
    const query = `INSERT INTO metals_user_gen ( id, central_element, formula_string, charge) VALUES (${id}, '${metalName}', '${formula_string}', ${charge})`;
    await pool.query(query);

    res.status(201).send('Data inserted into metals table successfully');
  } catch (error) {
    console.error('Error inserting data into metals table:', error);
    res.status(500).send('Internal Server Error:', error);
  }
});

// Route to handle POST request to insert data into the 'ligands_mapping' table
app.post('/ligands', async (req, res) => {
  try {
    const { LigandName, LigandFormula, LigandProtonation } = req.body;

    // Insert data into the 'ligands_mapping' table
    const query = 'INSERT INTO ligands_mapping (LigandName, LigandFormula, LigandProtonation) VALUES ($1, $2, $3)';
    await pool.query(query, [LigandName, LigandFormula, LigandProtonation]);

    res.status(201).send('Data inserted into ligands_mapping table successfully');
  } catch (error) {
    console.error('Error inserting data into ligands_mapping table:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to handle POST request to insert data into the 'conditions' table
app.post('/conditions', async (req, res) => {
  try {
    const { temperature, ionic_strength } = req.body;

    // Insert data into the 'conditions' table
    const query = 'INSERT INTO conditions (temperature, ionic_strength) VALUES ($1, $2)';
    await pool.query(query, [temperature, ionic_strength]);

    res.status(201).send('Data inserted into conditions table successfully');
  } catch (error) {
    console.error('Error inserting data into conditions table:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the Express.js server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
