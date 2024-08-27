const express = require('express')
const app = express()
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
var routes = require('./route/routes');
const cors = require('cors');

app.use(cors(
    {
      origin: "http://localhost:4200"
    }
  ));

// Start the Express server (Ports 1024-49151 are registered ports, often used by various applications.)
const server = app.listen(9992,function check(err){
    if(err)
        console.log("Error: server.js(17)")
    else
        console.log("\nStarted on port 9992!\n")
});

// Connect to MongoDB using Mongoose
mongoose.connect("mongodb://127.0.0.1:27017/userData", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB is connected!\n");
    })
    .catch(error => {
        console.log("MongoDB failed to connect:", error);
    });

mongoose.connection.on('error', (error) => {
    console.log('MongoDB connection error:', error);
});

process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Server closed.');
        mongoose.connection.close(false, () => {
            console.log('MongoDB connection closed.');
            process.exit(0);
        });
    });
});


app.use(express.json());
app.use(routes);
console.log('I got to the routes!');
