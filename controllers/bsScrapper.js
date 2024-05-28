// Import required libraries
const axios = require('axios');
const cheerio = require('cheerio');

// Function to webscrap transitlink
const getBusStops = async(req, res) => {
    const busNumber = req.params.busNumber;
    const dir = req.params.direction;
    console.log(dir);
    const baseURLdir = `https://www.sbstransit.com.sg/Service/BusService?ServiceType=Basic&ServiceNo=${busNumber}&ServiceType=Basic&Dir=${dir}`;
    console.log(baseURLdir);

    try {
        // Create an array to store desired data
        const busStops = [];

        await axios.get(baseURLdir).then((response) => {

            // Loads HTML content obtained and parses it as a Cheerio object to be used to manipulate HTML data
            // $ variable assigned to Cheerio object, mimicking jQuery usage in the browser. Allows usage of jQuery style selectors & methods
            const $ = cheerio.load(response.data);
            
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
                const roadName = $(el).find('td.normal-line.fontbold').text().substring(0, 35).trim();
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


            // Iterate through 'roadName' field and check if next row's 'roadName' field is empty
            // If empty, set to current 'roadName' field value
            for(let i = 0; i < busStops.length; i++){
                if(i+1 == busStops.length){
                    break;
                }
                if(busStops[i+1]['Road Name'] == ''){
                    busStops[i+1]['Road Name'] = busStops[i]['Road Name'];
                }
                else{
                    continue;
                }
            }

        })

        // Need a check to see if the last busData contains the final stop (eg: bus 70 has wonky data)
        // If check fails, go to dir2 and take their first data to append to busStops
        if(dir == 1){
            const baseURLdir = `https://www.sbstransit.com.sg/Service/BusService?ServiceType=Basic&ServiceNo=${busNumber}&ServiceType=Basic&Dir=2`;
            console.log(baseURLdir);
            await axios.get(baseURLdir).then((response) => {
                const $ = cheerio.load(response.data);
                const busStopTableBodyAmended = $('table.tbres.lefttext.tb-fix tbody tr:eq(1)');

                const roadName = $(busStopTableBodyAmended).find('td.normal-line.fontbold').text().substring(0, 35).trim();
                const busStopNo = $(busStopTableBodyAmended).find('td.col1bg.center-text').text().trim();
                const busStopName = $(busStopTableBodyAmended).find('td.col2bg.fontbold').text().trim().substring(0, 25).trim();

                const busData = {
                    'Road Name' : roadName,
                    'Bus Stop Number' : busStopNo,
                    'Bus Stop Name' : busStopName
                };

                // Check if last item in busStops list corresponds to first item in the second bus path
                if(busStops[busStops.length - 1]['Bus Stop Number'] != busData['Bus Stop Number']){
                    console.log(busData['Bus Stop Number']);
                    console.log(busStops[busStops.length - 1]['Bus Stop Number']);
                    busStops.push(busData);
                }
            })

        }

        // Return value if successful
        res.status(200).json(busStops);

    }
    catch (error){
        console.error(error);
        // Returns an error in JSON format
        res.status(500).json({ error: 'An error occurred while fetching bus stops' });
    }

};

module.exports = getBusStops;