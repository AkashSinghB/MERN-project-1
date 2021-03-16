//to use express first declare it

const express = require("express");

//then use that declaration to use express
const app = express();

//post no can be anything
// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })

const port = 3000;

const admin = (req,res) => {
    return res.send("admin dashboard");
};

const isAdmin = (req, res, next) => {
    console.log("isAdmin is running")
    next();
};

const isLoggedIn = (req,res,next) => {
    console.log("you are logged in")
    next();
};

app.get("/admin", isLoggedIn, isAdmin ,admin);//callback = a function without any name



app.get("/akash", (req,res) => {
    return res.send("Akash was here");
});
app.get("/", (req,res) => {
    return res.send("This is hitesh homepage");

});

app.listen(port, () => { 
    console.log("server is up and running.....");
});