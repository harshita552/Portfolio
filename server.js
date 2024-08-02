require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const contactFormHandler = require('./api/submit_contact'); // Adjust the path if necessary

const app = express();
const PORT = process.env.PORT || 3000; // Use environment variable for PORT

app.use(cors());
app.use(bodyParser.json());

// Serve static files from the 'assets' directory
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// API endpoint for contact form submission
app.post('/api/contact', contactFormHandler);

// Handle GET requests to the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Fallback route for any other paths
app.get('*', (req, res) => {
    res.status(404).send('404 Not Found');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
