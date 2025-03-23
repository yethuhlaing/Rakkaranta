# Temperature Data Pipeline

This is a simple temperature data pipeline that demonstrates a complete data flow from input to output.

## Features
- **Input**: Send temperature data via POST requests.
- **Processing**: Store data in an in-memory array.
- **Output**: Retrieve data via GET requests and display it on a frontend page.

## Architecture

### Overall Structure
- **Data Source**: Temperature data is sent via POST requests using Postman.
- **Processing**: Express backend validates and stores data in an in-memory array.
- **Storage**: In-memory array (`temperatures`).
- **Visualization**: Frontend HTML page fetches data via GET requests and displays it.

### Data Flow
1. User sends temperature data via Postman (POST `/temperature`).
2. Express backend stores data in memory.
3. Frontend fetches data (GET `/temperature`) and displays it in a list.
4. User can delete all data (DELETE `/temperature`) to comply with GDPR.

### Architectural Diagram
- **Client (Postman)** -> POST `{"value": 23.5}` -> **Express API**
- **Express API**:
  - POST `/temperature` -> Store Data -> **In-Memory Storage (Array)**
  - GET `/temperature` <- Fetch Data <- **In-Memory Storage (Array)**
  - DELETE `/temperature` -> Clear Data -> **In-Memory Storage (Array)**
- **Frontend (HTML + JS)** -> GET Request (fetch) -> **Express API** -> Return Data `[23.5, ...]`

### Key Components
- **Data Collection**: POST requests via Postman.
- **Processing**: Backend validation and storage.
- **Storage**: In-memory array.
- **Visualization**: HTML and JavaScript frontend.

### Technologies and Tools
- Node.js and Express (backend API)
- HTML and JavaScript (frontend display)
- Postman (testing tool)
- Jest and Supertest (unit testing)
- Postman (manual performance testing)

## Testing Plan

### Unit Testing
- **Tool**: Jest and Supertest
- Tests POST and GET endpoints to ensure correct behavior.
- Example: `POST /temperature` returns 201 for valid data, 400 for invalid data.

### Integration Testing
- Ensures backend and frontend work together.
- Test: Send data via Postman, verify it displays on the frontend.

### Performance Testing
- **Tool**: Postman (manual testing)
- Sent multiple GET requests to `/temperature`, average response time: ~3ms.
- No errors observed during testing.

### Data Validation
- Validates input data in the backend:
  - Checks if `value` is present.
  - Ensures `value` is a number.
- Returns 400 for invalid data.

## Security Measures

### Firewalls
- Not implemented locally; recommended to configure at the infrastructure level (e.g., Azure NSG) to restrict access to port 3000.

### CORS
- Restricts API access to `http://localhost:3000` only.

### Data Encryption
- Not implemented (recommended to use HTTPS in production).

### Access Control
- API key authentication (`group_e: secret_key`) required for all requests.

### GDPR Compliance
- **Data Minimization**: Only collects `value`.
- **Data Deletion**: Added DELETE `/temperature` endpoint to clear data.

## How to Run
1. Install dependencies: `npm install`
2. Start the server: `node server.js`
3. Access the frontend: Open `http://localhost:3000` in a browser
4. Test data: Use Postman to send a POST request to `http://localhost:3000/temperature` with header `group_e: secret_key`, e.g., `{"value": 23.5}`
5. Run tests: `npm test` (unit tests)

## Test Results
- Data added via POST requests is displayed on the frontend page.
- DELETE requests successfully clear all data.