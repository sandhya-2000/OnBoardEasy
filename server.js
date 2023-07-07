const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5432 // Set the desired port number

// MongoDB connection string
const dbURI = 'mongodb://localhost/restaurant-onboarding'; // Update with your MongoDB connection string
var cors = require('cors');
const corsOpts = {
    origin: '*',  
    methods: [
      'GET',
      'POST',
    ],  
    allowedHeaders: [
      'Content-Type',
    ],
  };  
  app.use(cors(corsOpts));

// Connect to MongoDB
mongoose
    .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        // Start the server after successful database connection
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
    });

// Import the Restaurant model
const Restaurant = require('./src/models/Restaurant');

// Middleware to parse JSON request body
app.use(express.json());

// Define API endpoints
app.post('/api/submit-restaurant', (req, res) => {
    const { name, contactName, pincode, location, website, phoneNumber, dailyTransactions } = req.body;

    // Create a new restaurant instance
    const restaurant = new Restaurant({
        name,
        contactName,
        pincode,
        location,
        website,
        phoneNumber,
        dailyTransactions,
    });

    // Save the restaurant details in the MongoDB database
    restaurant
        .save()
        .then(() => {
            console.log('Restaurant details saved successfully');
            res.send(true)
        })
        .catch((err) => {
            console.error('Error saving restaurant details:', err);
            res.send(false,err)
        });
});



