// Import required libraries
const axios = require('axios');
const cheerio = require('cheerio');

// Function to webscrap transitlink
const getBusStops = async(req, res) => {
    const busNumber = req.params.busNumber;
    const baseURL = `https://www.sbstransit.com.sg/Service/BusService?ServiceType=Basic&ServiceNo=${busNumber}`;
    try {
        axios.get(baseURL).then((response) => {

            // Loads HTML content obtained and parses it as a Cheerio object to be used to manipulate HTML data
            // $ variable assigned to Cheerio object, mimicking jQuery usage in the browser. Allows usage of jQuery style selectors & methods
            const $ = cheerio.load(response.data);

            // Create an array to store desired data
            const busStops = [];
                
            res.status(200).json(response.data);
        })
    }
    catch (error){
        console.error(error);
        // Returns an error in JSON format
        res.status(500).json({ error: 'An error occurred while fetching bus stops' });
    }
};  

module.exports = getBusStops;