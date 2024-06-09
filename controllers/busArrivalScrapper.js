// Import required libraries
const axios = require('axios');

// Import required functions
const { getSGTTimeDifference } = require('../utils/getSGTTimeDifference');
// Template URL to send GET request to: http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2?BusStopCode=???

const getBusArrival = async (req, res) => {
    LTA_DATAMALL_API_KEY = process.env.REACT_APP_LTA_DATAMALL_API_KEY;
    const busStopCode = req.params.busStopCode;
    const baseURLdir = `http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2?BusStopCode=${busStopCode}`;

    const headers = {
        'AccountKey': LTA_DATAMALL_API_KEY, // Replace with your AccountKey
        'accept': 'application/json'
    }

    try{
        const busServices = [];
        await axios.get(baseURLdir, {headers}).then((response) => {
            const busInformation = response.data.Services;
            // Append required information to busServices array
            for(let i = 0; i < busInformation.length; i++){
                // Create a serviceNo array for each bus service at the bus stop
                const serviceNo = {
                    serviceNo: busInformation[i].ServiceNo,
                    // Convert arrival time from ISO 8601 format to give time difference in minutes from current time
                    eta: getSGTTimeDifference(busInformation[i].NextBus.EstimatedArrival),
                    eta2: getSGTTimeDifference(busInformation[i].NextBus2.EstimatedArrival),
                }

                busServices.push(serviceNo);

            }
        });

        // Return value if successful
        console.log('API Call To LTA Database Successful');
        res.status(200).json(busServices);

    }
    catch(error){
        console.error(error);
        // Returns an error in JSON format
        res.status(500).json({ error: 'An error occurred while fetching bus arrival timings' });
    }
}

module.exports = getBusArrival;