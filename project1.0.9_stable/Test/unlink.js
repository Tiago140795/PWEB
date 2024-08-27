const express = require('express')
const app = express()
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
var routes = require('./route/routes');
const cors = require('cors');


app.close(9992,function check(err){
if(err)
    console.log("Error: server.js(17)")
else
    console.log("\Finished!\n")
});



