// Import required libraries
const axios = require('axios');
const cheerio = require('cheerio');

//https://www.lta.gov.sg/map/busService/bus_route_xml/851.xml

// Function to webscrap lta website
const getBusStops = async(req, res) => {
    const busNumber = req.params.busNumber;
    const dir = req.params.direction - 1;
    const baseURLdir = `https://www.lta.gov.sg/map/busService/bus_route_xml/${busNumber}.xml`;

    try {
        // Create an array to store desired data
        const busStops = [];

        await axios.get(baseURLdir).then((response) => {

            // Loads HTML content obtained and parses it as a Cheerio object to be used to manipulate HTML data
            // $ variable assigned to Cheerio object, mimicking jQuery usage in the browser. Allows usage of jQuery style selectors & methods
            const $ = cheerio.load(response.data, {xmlMode: true});
            
            // Returns the table needed in the DOM
            const busStopTableBody = $(`route direction:eq(${dir}) busstop`);
             
            // Debugging purposes
            // console.log(busStopTableBody.text());
            // busStopTableBody.each((_idx, el) => {
            //     console.log($(el).html());
            // });
            // console.log($.text());
            
            // Loops over each tr in the tbody and obtains the neccessary data from each tr
            busStopTableBody.each((_idx, el) => {
                const busStopNo = $(el).attr('name').trim();
                const busStopName = $(el).find('details').text().trim();
                console.log(busStopNo, 'bsScrapper.js');


                const busData = {
                    'Bus Stop Number' : busStopNo,
                    'Bus Stop Name' : busStopName
                };

                // Push data into the list
                console.log(busData);
                busStops.push(busData); 

            });


            // Iterate through 'roadName' field and check if next row's 'roadName' field is empty
            // If empty, set to current 'roadName' field value
            // for(let i = 0; i < busStops.length; i++){
            //     if(i+1 == busStops.length){
            //         break;
            //     }
            //     if(busStops[i+1]['Road Name'] == ''){
            //         busStops[i+1]['Road Name'] = busStops[i]['Road Name'];
            //     }
            //     else{
            //         continue;
            //     }
            // }

        })

        // Need a check to see if the last busData contains the final stop (eg: bus 70 has wonky data)
        // If check fails, go to dir2 and take their first data to append to busStops
        // if(dir == 1){
        //     const baseURLdir = `https://www.sbstransit.com.sg/Service/BusService?ServiceType=Basic&ServiceNo=${busNumber}&ServiceType=Basic&Dir=2`;
        //     await axios.get(baseURLdir).then((response) => {
        //         const $ = cheerio.load(response.data);
        //         const busStopTableBodyAmended = $('table.tbres.lefttext.tb-fix tbody tr:eq(1)');

        //         const roadName = $(busStopTableBodyAmended).find('td.normal-line.fontbold').text().substring(0, 35).trim();
        //         const busStopNo = $(busStopTableBodyAmended).find('td.col1bg.center-text').text().trim();
        //         const busStopName = $(busStopTableBodyAmended).find('td.col2bg.fontbold').text().trim().substring(0, 25).trim();

        //         const busData = {
        //             'Road Name' : roadName,
        //             'Bus Stop Number' : busStopNo,
        //             'Bus Stop Name' : busStopName
        //         };

        //         // Check if last item in busStops list corresponds to first item in the second bus path
        //         if(busStops[busStops.length - 1]['Bus Stop Number'] != busData['Bus Stop Number']){
        //             busStops.push(busData);
        //         }
        //     })

        // }

        // Iterate through list of arrays and create new key 'Road + Bus Stop' which joins road name to bus stop name for more accurate geolocation
        // for(let j = 0; j<busStops.length; j++){
        //     // Utilize regex to replace all whitespaces within the string to '+'
        //     // Concatenate 2 array fields into a new fi eld
        //     busStops[j]['Bus Stop + Road'] = (busStops[j]['Bus Stop Name'] + '+' + busStops[j]['Road Name']).replace(/\s/g, "+");
        // }

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
        console.log(busStops)
        res.status(200).json(busStops);

    }
    catch (error){
        console.error(error);
        // Returns an error in JSON format
        res.status(500).json({ error: 'An error occurred while fetching bus stops' });
    }

};

module.exports = getBusStops;