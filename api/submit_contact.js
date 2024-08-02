const mongoose = require('mongoose');
const Contact = require('../models/contacts'); // Adjust the path accordingly

const uri = 'mongodb://localhost:27017/contact_form_db'; // Your database URI with the database name

// Connect to MongoDB once when the module is loaded
mongoose.connect(uri)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const handler = async (req, res) => {
    if (req.method === 'POST') {
        console.log("Contact save successfully");

        const { name, email, mobile, message } = req.body;

        if (!name || !email || !mobile || !message) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        try {
            const newContact = new Contact({ name, email, mobile, message });
            const savedContact = await newContact.save();

            console.log("Contact saved successfully with ID:", savedContact.id);
            res.status(201).json({ id: savedContact.id });
        } catch (error) {
            console.error('Error saving contact:', error); // Improved logging
            res.status(500).json({ error: 'Database error occurred.' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

module.exports = handler;
