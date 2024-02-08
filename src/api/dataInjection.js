// Import necessary modules
const express = require('express');
const { Pool } = require('pg');

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

// Middleware to parse JSON bodies
app.use(express.json());

// Route to handle data injection for metals table
app.post('/inject/metal', async (req, res) => {
  try {
    const { legacy_string, charge } = req.body;
    const query = 'INSERT INTO metals (legacy_string, charge) VALUES ($1, $2)';
    await pool.query(query, [legacy_string, charge]);
    res.status(200).json({ message: 'Data inserted into metals table successfully' });
  } catch (error) {
    console.error('Error inserting data into metals table:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to handle data injection for ligands_mapping table
app.post('/inject/ligand', async (req, res) => {
  try {
    const { LigandName, LigandFormula, LigandProtonation } = req.body;
    const query = 'INSERT INTO ligands_mapping (LigandName, LigandFormula, LigandProtonation) VALUES ($1, $2, $3)';
    await pool.query(query, [LigandName, LigandFormula, LigandProtonation]);
    res.status(200).json({ message: 'Data inserted into ligands_mapping table successfully' });
  } catch (error) {
    console.error('Error inserting data into ligands_mapping table:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to handle data injection for conditions table
app.post('/inject/condition', async (req, res) => {
  try {
    const { temperature, ionic_strength } = req.body;
    const query = 'INSERT INTO conditions (temperature, ionic_strength) VALUES ($1, $2)';
    await pool.query(query, [temperature, ionic_strength]);
    res.status(200).json({ message: 'Data inserted into conditions table successfully' });
  } catch (error) {
    console.error('Error inserting data into conditions table:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});