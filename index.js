// Import required libraries
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

// Import required routes
const busRoutes = require('./routes/busStops.js');


// Create instance of express application
const app = express();

// Middleware used by app
app.use(cors());

// Routes used by app
app.use(express.json());
app.use('/scrape', busRoutes);

// Start server & listen to the port & IP specified
const PORT = process.env.PORT || 5000;
const IP = process.env.IP || "0.0.0.0"
app.listen(PORT, IP, () => {
  console.log(`Server is running on IP ${IP}, port ${PORT}`);
});