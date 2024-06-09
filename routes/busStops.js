// Import required libraries & functions
const express = require('express');
const getBusStops = require('../controllers/bsScrapper.js');
const getBusArrival = require('../controllers/busArrivalScrapper.js');


const router = express.Router();

// Dynamic Route handlers for GET requests
router.get('/:busNumber/:direction', getBusStops);

// Dynamic Route handlers for GET requests
router.get('/:busStopCode', getBusArrival);


module.exports = router;