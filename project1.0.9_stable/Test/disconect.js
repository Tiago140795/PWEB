const mongoose = require('mongoose');
const express = require('express');
const app = express();

// ... other code ...

// Close the specific MongoDB connection and stop the server
const userDataDB = "mongodb://127.0.0.1:27017/userData";
mongoose.connection.close(function () {
    console.log("MongoDB is disconnected!\n");
    const server = app.listen(9992, function () {
        console.log(`Server is running on port 9992\n`);
    });

    // Gracefully close the server when the app is terminated
    process.on('SIGTERM', () => {
        console.log('Closing the server...');
        server.close(() => {
            console.log('Server has been closed.');
            process.exit(0);
        });
    });
});