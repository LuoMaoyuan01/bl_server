// Import required libraries
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

// Import required routes
const busRoutes = require('./routes/busStops.js');


// Create instance of express application
const app = express();

// Specify port number for the server
const port = 5000;

// Middleware used by app
app.use(cors());

// Routes used by app
app.use(express.json());
app.use('/scrape', busRoutes);

// Start server & listen to the port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});