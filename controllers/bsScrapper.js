// Import required libraries
const axios = require('axios');
const cheerio = require('cheerio');

// Template URL to send GET request to: https://www.lta.gov.sg/map/busService/bus_route_xml/851.xml

// Function to webscrap lta website
const getBusStops = async(req, res) => {
    const busNumber = req.params.busNumber;
    const dir = req.params.direction - 1;
    const baseURLdir = `https://www.lta.gov.sg/map/busService/bus_route_xml/${busNumber.toString()}.xml`;

    try {
        // Create an array to store desired data
        const busStops = [];
        console.log(baseURLdir);

        await axios.get(baseURLdir).then((response) => {

            // Loads HTML content obtained and parses it as a Cheerio object to be used to manipulate HTML data
            // $ variable assigned to Cheerio object, mimicking jQuery usage in the browser. Allows usage of jQuery style selectors & methods
            const $ = cheerio.load(response.data, {xmlMode: true});
            
            // Returns the table needed in the DOM
            const busStopTableBody = $(`route direction:eq(${dir}) busstop`);

            
            // Loops over each tr in the tbody and obtains the neccessary data from each tr
            busStopTableBody.each((_idx, el) => {
                const busStopNo = $(el).attr('name').trim();
                const busStopName = $(el).find('details').text().trim();
                // console.log(busStopNo, 'bsScrapper.js');


                const busData = {
                    'Bus Stop Number' : busStopNo,
                    'Bus Stop Name' : busStopName
                };

                // Push data into the list
                busStops.push(busData); 

            });
        })

        // Obtain lta.gov.sg xml file on bus stop lat & lng
        // Append latlng of busstop corresponding to the correct bus stop number
        const ltaURLdir = "https://www.lta.gov.sg/map/busService/bus_stops.xml";
        await axios.get(ltaURLdir).then((response) => {
            $ = cheerio.load(response.data, {xmlMode: true});
            busIDS = $('busstops busstop');
            busIDS.each((_idx, el) => {
                for(let z = 0; z<busStops.length; z++){
                    if($(el).attr('name') == busStops[z]['Bus Stop Number']){
                        busStops[z]['lat'] = $(el).find('lat').text().trim();
                        busStops[z]['lng'] = $(el).find('long').text().trim();
                    }
                }
                
            })
        })
        

        // Return value if successful
        console.log('Finished Scrapping');
        res.status(200).json(busStops);

    }
    catch (error){
        console.error(error);
        // Returns an error in JSON format
        res.status(500).json({ error: 'An error occurred while fetching bus stops' });
    }

};

module.exports = getBusStops;