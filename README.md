# Welcome To ST Engineering Bus Rapid Transit GIS 
Develop a GIS function that loads all the routes associated with a Singapore bus number

## Project Overview
ST Engineering BRT GIS prototype web application that aims to simulate the functions required to control and survey a BRT system based in Singapore.

## Developers:
Management: Grishi Gupta <br/>
Development Team : Luo Maoyuan <br/>
Design Team : <br/>

## About:
The purpose of this file is to provide overview, setup instructions and background information of the project. <br/>
If you have joined this project as a part of the development team, please ensure this file is up to date.

This client side code is developed with [Node JS](https://nodejs.org/) and tested on [Visual Studio Code](https://code.visualstudio.com/). <br/>

**Note : Any dependencies added / modified to this project which affect the running of the code in this git repository must be listed in this file. All developers must ensure that the instructions mentioned in this file are sufficient to enable a new developer to obtain a executable copy of the lastest code in this repository, without invlvement from any other human assistance.**

## Local Environment Installation & Setup

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/LuoMaoyuan01/bl_server
    ```
2. Create a .env file in the server folder. The file should contain a **LTA DATAMALL API KEY**.

    ```javascript
    REACT_APP_LTA_DATAMALL_API_KEY='LTA DATAMALL API KEY 1234'
    ```

3. Navigate to the server directory:

    ```bash
    cd bl_server
    ```

4. Install backend dependencies:

    ```bash
    npm install
    ```

5. Start the backend server:

    ```bash
    npm start
    ```

6. Start frontend development server.

## Docker Installation & Setup
- docker build -t bl_server:v100 . (custom version number in sequence) <br/>
- docker run -p 5000:5000 bl_server:v100 (custom version number in sequence) <br/>

## Technology Stacks Used

- [Node.js](https://nodejs.org/) - A JavaScript runtime built on Chrome's V8 JavaScript engine. <br/>
- [Express.js](https://expressjs.com/) - A minimal and flexible Node.js web application framework. <br/>
- [CORS](https://www.npmjs.com/package/cors) - Cross Origin Resource Sharing Middleware for requests made from different ports of same machine <br/>

## Notes

## References
