require('dotenv').config()  //As early as possible in your application, require and configure dotenv.
const mongoose = require('mongoose');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require('cors');


const authRoutes = require("./routes/auth.js");


//mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(( ) => {
    console.log("DB CONNECTED")
}) //firing a callback in then


//Middlewares

//app.use(bodyParser.json()); //its changed now
app.use(express.json());
app.use(cookieParser()); 
app.use(cors());

//MyRoutes
app.use("/api", authRoutes);


//port
const port = process.env.PORT || 8000;

//starting a server
app.listen(port, () => {
    console.log(`app is running at ${port}`);
});
