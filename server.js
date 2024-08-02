const mongoose = require('mongoose');
const Cors = require('cors');
const Contact = require('./models/contacts'); // Adjust the path accordingly

const uri = process.env.MONGODB_URI; // Use environment variable for the MongoDB URI
const cors = Cors({
    methods: ['GET', 'POST', 'OPTIONS'],
});

// Connect to MongoDB function
const connectToDatabase = async () => {
    if (mongoose.connection.readyState === 0) { // 0 = disconnected
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected');
    }
};

const handler = async (req, res) => {
    await new Promise((resolve, reject) => cors(req, res, (result) => {
        if (result instanceof Error) return reject(result);
        resolve();
    }));

    // Ensure database connection before processing the request
    await connectToDatabase();

    if (req.method === 'POST') {
        const { name, email, mobile, message } = req.body;

        if (!name || !email || !mobile || !message) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        try {
            const newContact = new Contact({ name, email, mobile, message });
            const savedContact = await newContact.save();
            res.status(201).json({ id: savedContact.id });
        } catch (error) {
            console.error('Error saving contact:', error);
            res.status(500).json({ error: 'Database error occurred.' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

module.exports = handler;
