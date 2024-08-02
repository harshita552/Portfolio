const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS
const contactFormHandler = require('./api/submit_contact'); // Adjust the path if necessary
const Contact = require('./models/contacts'); // Adjust the path if necessary


const app = express();
const PORT = 3000;

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Contact Form API!');
});

// Route to get all contact data
app.get('/api/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve contacts.' });
    }
});

// Contact form API route
app.post('/api/contact', contactFormHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
