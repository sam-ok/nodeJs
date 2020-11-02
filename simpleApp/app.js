const path = require("path");
const express = require("express"); 
const mongoose = require('mongoose'); 
require('dotenv/config');

const PORT = process.env.PORT || 3000;


const app = express();

// connect mongoose using mongodb+srv://ekomens1:<password>@cluster0.mqp0h.mongodb.net/test;
// mongoose.connect(process.env.MyDataBase, {
//   useUnifiedTopology: true,
//    useNewUrlParser: true 
//   } );

// DATABASE=mongodb://localhost:27017/cohort5
// We want to test if the mongoose connection is open or otherwise
// mongoose.connection 
// .on("open", () => { console.log("Mongoose connection open");
//  }) 
//  .on("error", err => { 
//    console.log(`Connection error: ${err.message}`);
//   });

// setting up pug
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
// Connecting to the public folder
app.set(express.static(path.join(__dirname, 'public')));

// middleware
app.use("/posts", () => {
  console.log("This is middleware running");
});

///Route
app.get("/", (req, res) => {
  res.send("We are home");
  res.end();
});

//Render pug
app.get("/form1", (req, res) => {
  res.render("form1");
});

// Routing for positing
app.post('/form1', (req, res)=>{
  console.log(req.body);
  // significance of the end method. 
  /*why aren't we passing it with express and yet it is used on the http 
  module from which the express framework is built*/
  res.end();
})
// Server
app.listen(PORT, () => {
  console.log(`Eavesdropping on port ${PORT} >>>`);
});

