// Import required libraries & functions
const express = require('express');
const getBusStops = require('../controllers/bsScrapper.js');


const router = express.Router();

// Route handlers for GET requests
router.get('/:busNumber', getBusStops);


module.exports = router;