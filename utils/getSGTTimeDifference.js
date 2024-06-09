// Converts ISO 8601 date and time representation to MM/DD/YYYY, HH:MM:SS AM/PM SGT format

function getSGTTimeDifference(dateString) {
    // Parse the given date string
    const givenDate = new Date(dateString);

    // Get the current time in Singapore Time (SGT)
    const options = { timeZone: 'Asia/Singapore' };
    const formatter = new Intl.DateTimeFormat('en-US', options);

    // Get the current date and time in UTC
    const now = new Date();

    // Format the current date and time to SGT
    const nowSGTString = formatter.formatToParts(now)
        .map(({ type, value }) => {
            if (type === 'timeZoneName') return '';
            return value;
        }).join('');

    const nowSGT = new Date(`${nowSGTString} UTC+08:00`);

    // Calculate the difference in milliseconds
    const differenceInMilliseconds = nowSGT - givenDate;

    // Convert the difference to minutes
    const differenceInMinutes = Math.floor(differenceInMilliseconds / 1000 / 60);

    return differenceInMinutes;
}

module.exports = getSGTTimeDifference;