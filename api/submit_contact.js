const mongoose = require('mongoose');
const Cors = require('cors');
const Contact = require('../models/contacts'); // Adjust the path accordingly

const uri = 'mongodb://localhost:27017/contact_form_db'; // Your database URI with the database name
const cors = Cors({
    methods: ['POST', 'OPTIONS'],
});

// Connect to MongoDB once when the module is loaded
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const handler = async (req, res) => {
    await new Promise((resolve, reject) => cors(req, res, (result) => {
        if (result instanceof Error) return reject(result);
        resolve();
    }));

    if (req.method === 'POST') {
        // Log the incoming request body
        // console.log('Request Body:', req.body); 
        console.log("Contact save successfully");

        const { name, email, mobile, message } = req.body;

        if (!name || !email || !mobile || !message) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        try {
            const newContact = new Contact({ name, email, mobile, message });
            const savedContact = await newContact.save();

            // Log the ID of the saved contact
            console.log("Contact saved successfully with ID:", savedContact.id);

            // Return only the ID of the saved contact
            res.status(201).json({ id: savedContact.id });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Database error occurred.' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

module.exports = handler;
