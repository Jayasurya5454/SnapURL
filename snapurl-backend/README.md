# SnapURL Backend

This is the backend service for the SnapURL project. It provides APIs to shorten URLs and manage them.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB

## Tech Stack

- Node.js
- Express.js
- MongoDB


## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/Jayasurya5454/SnapURL.git
    cd snapurl-backend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:
    ```env
    MONGODB_URI=your_mongodb_uri
    PORT=your_port
    ```

## Running the Application

To start the development server, run:
```sh
npm start
```

The server will start on the port specified in the `.env` file.

## License

This project is licensed under the Apache License 2.0.