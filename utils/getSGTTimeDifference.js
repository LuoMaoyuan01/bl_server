// Converts ISO 8601 date and time representation to MM/DD/YYYY, HH:MM:SS AM/PM SGT format

const getSGTTimeDifference = (dateString) => {
    // Parse the given date string as UTC time
    const givenDate = new Date(dateString);

    // Get the current time in UTC
    const now = new Date();

    // Convert the given date to Singapore Time (SGT)
    const givenDateSGT = new Date(givenDate.getTime() + (8 * 60 * 60 * 1000));

    // Convert the current time to Singapore Time (SGT)
    const nowSGT = new Date(now.getTime() + (8 * 60 * 60 * 1000));

    // Calculate the difference in milliseconds
    const differenceInMilliseconds = givenDateSGT - nowSGT;

    // Convert the difference to minutes
    const differenceInMinutes = Math.floor(differenceInMilliseconds / 1000 / 60);
    
    // Check if the difference is <= 0 minutes
    if(differenceInMinutes <= 0){
        return 'Arriving';
    }
    
    if(isNaN(differenceInMinutes) || differenceInMinutes == 'NaN' || differenceInMinutes == null){
        return 'No Est. Available';
    }

    // Return in string format
    return (differenceInMinutes.toString() + ' Min');
}

module.exports = getSGTTimeDifference;