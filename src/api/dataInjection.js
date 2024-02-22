// Import necessary modules
const express = require('express');
const { Pool } = require('pg');
const path = require('path'); // Import the 'path' module

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

// Define the port number
const port = 3003; // Set the port number to 3000 or any other available port

// Route to handle POST request to insert data into multiple tables
app.post('/insertData', async (req, res) => {
  try {
    const { metalsData, conditionsData, ligandsData } = req.body;

    // Insert data into the 'metals' table
    const metalsQuery = 'INSERT INTO metals_user_gen (id, central_element, formula_string, charge) VALUES (${id}, ${central_element}, ${formula_string}, ${charge})';
    await pool.query(metalsQuery, [metalsData.id, metalsData.central_element, metalsData.formula_string, metalsData.charge]);

    // Insert data into the 'conditions' table
    const conditionsQuery = 'INSERT INTO conditions_user_gen (id, temperature, ionic_strength) VALUES (${id}, ${temperature}, ${ionic_strength})';
    await pool.query(conditionsQuery, [conditionsData.id, conditionsData.temperature, conditionsData.ionic_strength]);

    // Insert data into the 'ligands_mapping' table
    const ligandsQuery = 'INSERT INTO ligands_mapping_user_gen (id, LigandName, LigandFormula, LigandProtonation) VALUES (${id}, ${LigandName}, ${LigandFormula}, ${LigandProtonation})';
    await pool.query(ligandsQuery, [ligandsData.id, ligandsData.LigandName, ligandsData.LigandFormula, ligandsData.LigandProtonation]);

    res.status(201).send('Data inserted into all tables successfully');
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).send('Internal Server Error', error);
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
