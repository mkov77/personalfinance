// backend/index.js
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'personalfinance',
  password: 'admin',
  port: 5432,
});

app.use(cors());
// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.get('/contributions', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contributions');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.post('/contributions', async (req, res) => {
  const { contributiondate, contributionamount, contributionsource, contributor, contributiongoal } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO contributions (contributiondate, contributionamount, contributionsource, contributor, contributiongoal) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [contributiondate, contributionamount, contributionsource, contributor, contributiongoal]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.delete('/contributions/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM contributions WHERE contributionid = $1', [id]);
    res.send('Contribution deleted');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Add this to server.js

app.put('/contributions/:id', async (req, res) => {
  const { id } = req.params;
  const { contributiondate, contributionamount, contributionsource, contributor, contributiongoal } = req.body;
  try {
    const result = await pool.query(
      'UPDATE contributions SET contributiondate = $1, contributionamount = $2, contributionsource = $3, contributor = $4, contributiongoal = $5 WHERE contributionid = $6 RETURNING *',
      [contributiondate, contributionamount, contributionsource, contributor, contributiongoal, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Endpoint to add a goal
app.post('/goals', async (req, res) => {
  const { goalName, goalTargetDate } = req.body;

  try {
    const query = 'INSERT INTO goals (goalName, goalTargetDate) VALUES ($1, $2)';
    await pool.query(query, [goalName, goalTargetDate]);
    res.status(201).send('Goal added successfully');
  } catch (err) {
    console.error('Error adding goal:', err);
    res.status(500).send('Error adding goal');
  }
});

// GET endpoint to fetch all goals
app.get('/goals', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM goals');
    const goals = result.rows;
    client.release();
    res.json(goals);
  } catch (err) {
    console.error('Error fetching goals:', err);
    res.status(500).send('Error fetching goals');
  }
});

// DELETE to remove a goal from the goals table
app.delete('/goals/:goalname', async (req, res) => {
  const { goalname } = req.params;
  try {
    await pool.query('DELETE FROM goals WHERE goalname = $1', [goalname]);
    res.send('Goal deleted');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Endpoint to add a source
app.post('/sources', async (req, res) => {
  const { sourceName } = req.body;

  try {
    const query = 'INSERT INTO sources (sourcename) VALUES ($1)';
    await pool.query(query, [sourceName]);
    res.status(201).send('Source added successfully');
  } catch (err) {
    console.error('Error adding source:', err);
    res.status(500).send('Error adding source');
  }
});

// GET endpoint to fetch all sources
app.get('/sources', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT sourcename FROM sources ORDER BY sourcename');
    const sources = result.rows.map(row => row.sourcename);
    client.release();
    res.json(sources);
  } catch (err) {
    console.error('Error fetching sources:', err);
    res.status(500).send('Error fetching sources');
  }
});

// Endpoint to add a contributor
app.post('/contributors', async (req, res) => {
  const { contributorName } = req.body;

  try {
    const query = 'INSERT INTO contributors (contributorname) VALUES ($1)';
    await pool.query(query, [contributorName]);
    res.status(201).send('Contributor added successfully');
  } catch (err) {
    console.error('Error adding contributor:', err);
    res.status(500).send('Error adding contributor');
  }
});

// GET endpoint to fetch all contributors
app.get('/contributors', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT contributorname FROM contributors ORDER BY contributorname');
    const contributors = result.rows.map(row => row.contributorname);
    client.release();
    res.json(contributors);
  } catch (err) {
    console.error('Error fetching contributors:', err);
    res.status(500).send('Error fetching contributors');
  }
});

// GET endpoint to fetch all debt
app.get('/debts', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM debts');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});