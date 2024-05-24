import express from 'express'

// Create instance of express application
const app = express();

// Specify port number for the server
const port = 5000;

// Start server & listen to the port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});