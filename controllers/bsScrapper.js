// Import required libraries
const axios = require('axios');
const cheerio = require('cheerio');

// Function to webscrap transitlink
const getBusStops = async(req, res) => {
    const busNumber = req.params.busNumber;
    const baseURL = `https://www.sbstransit.com.sg/Service/BusService?ServiceType=Basic&ServiceNo=${busNumber}`;
    try {
        axios.get(baseURL).then((response) => {
            res.status(200).json(response.data);
        })
    }
    catch (error){
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching bus stops' });
    }
};  

module.exports = getBusStops;