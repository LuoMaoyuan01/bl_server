// Import required libraries
const axios = require('axios');
const cheerio = require('cheerio');

// Function to webscrap transitlink
const getBusStops = async(req, res) => {
    const busNumber = req.params.busNumber;
    const baseURL = `https://www.sbstransit.com.sg/Service/BusService?ServiceType=Basic&ServiceNo=${busNumber}`;    
    try {
        await axios.get(baseURL).then((response) => {

            // Loads HTML content obtained and parses it as a Cheerio object to be used to manipulate HTML data
            // $ variable assigned to Cheerio object, mimicking jQuery usage in the browser. Allows usage of jQuery style selectors & methods
            const $ = cheerio.load(response.data);
            

            // Create an array to store desired data
            const busStops = [];
            
            // Returns the table needed in the DOM
            const busStopTableBody = $('table.tbres.lefttext.tb-fix tbody tr:gt(0)');
             
            // Debugging purposes
            // console.log(busStopTableBody.text());
            // busStopTableBody.each((_idx, el) => {
            //     console.log($(el).html());
            // });
            // console.log($.text());
            
            // Loops over each tr in the tbody and obtains the neccessary data from each tr
            busStopTableBody.each((_idx, el) => {
                const roadName = $(el).find('td.normal-line.fontbold').text().substring(0, 20).trim();
                const busStopNo = $(el).find('td.col1bg.center-text').text().trim();
                const busStopName = $(el).find('td.col2bg.fontbold').text().trim().substring(0, 25).trim();


                const busData = {
                    'Road Name' : roadName,
                    'Bus Stop Number' : busStopNo,
                    'Bus Stop Name' : busStopName
                };

                // Push data into the list
                busStops.push(busData);
            })

            // Return value if successful
            res.status(200).json(busStops);
        })
    }
    catch (error){
        console.error(error);
        // Returns an error in JSON format
        res.status(500).json({ error: 'An error occurred while fetching bus stops' });
    }

};

module.exports = getBusStops;