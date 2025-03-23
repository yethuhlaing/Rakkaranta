# Temperature Data Pipeline

This is a simple temperature data pipeline that demonstrates a complete data flow from input to output.

## Features
- **Input**: Send temperature data via POST requests.
- **Processing**: Store data in an in-memory array.
- **Output**: Retrieve data via GET requests and display it on a frontend page.

## Technology Stack
- Node.js and Express (backend API)
- HTML and JavaScript (frontend display)

## How to Run
1. Install dependencies: `npm install`
2. Start the server: `node server.js`
3. Access the frontend: Open `http://localhost:3000` in a browser
4. Test data: Use Postman to send a POST request to `http://localhost:3000/temperature`, for example, `{"value": 23.5}`

## Test Results
Data added via POST requests will be automatically displayed on the frontend page.