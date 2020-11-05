const path = require("path");
const express = require("express");
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();

// Connecting to the local server

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection
  .on('open', () => {
    console.log('Mongoose connection open');
  })
  .on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
  });

const registrationSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
});

// if (errors.isEmpty()) {
//   const registration = new Registration(req.body);
//   registration.save()
//     .then(() => { res.send('Thank you for your registration!'); })
//     .catch((err) => {
//       console.log(err);
//       res.send('Sorry! Something went wrong.');
//     });
// } else {
//   res.send('Sorry! Something went wrong.');
// }



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
app.post('/form1', (req, res) => {
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

