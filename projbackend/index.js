require('dotenv').config()  //As early as possible in your application, require and configure dotenv.
const mongoose = require('mongoose');
const express = require("express");
const app = express();


//mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(( ) => {
    console.log("DB CONNECTED")
}) //firing a callback in then



const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`app is running at ${port}`);
});
