// Import required libraries & functions
const express = require('express');
const getBusStops = require('../controllers/bsScrapper.js');


const router = express.Router();

// Dynamic Route handlers for GET requests
router.get('/:busNumber/:direction', getBusStops);


module.exports = router;