const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS
const contactFormHandler = require('./api/submit_contact'); // Adjust the path if necessary

const app = express();
const PORT = 3000;

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

app.post('/api/contact', contactFormHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
