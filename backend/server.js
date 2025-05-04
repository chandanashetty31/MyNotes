const express = require('express');
const { Client } = require('pg');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
app.use(express.json());
app.use(cors());  // Enable cross-origin requests for your React app
dotenv.config();
// PostgreSQL client setup
const client = new Client({
    user: "postgres",
    host: "localhost",
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: 5432
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch((err) => console.error('Connection error', err.stack));

// API endpoints
// Get all notes
app.get('/notes', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM notes');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching notes');
  }
});

// Create a new note
app.post('/notes', async (req, res) => {
  const { title, content } = req.body;
  try {
    const result = await client.query('INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *', [title, content]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving note');
  }
});

// Delete a note
app.delete('/notes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await client.query('DELETE FROM notes WHERE id = $1', [id]);
    res.status(200).send('Note deleted');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting note');
  }
});

app.put('/notes/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  console.log('Updating note:', { id, title, content });  // Log incoming data

  try {
    // Use client.query to interact with PostgreSQL
    const result = await client.query(
      'UPDATE notes SET title = $1, content = $2 WHERE id = $3 RETURNING *',
      [title, content, id]
    );
    console.log('Updated note:', result.rows[0]);  // Log the updated note
    res.json(result.rows[0]); // Return the updated note to the client
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating note');
  }
});




// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
