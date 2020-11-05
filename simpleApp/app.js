const path = require("path");
const express = require("express");
const mongoose = require('mongoose');
const form1Routes = require('./routes/form1routes');
require('dotenv').config();


const PORT = process.env.PORT || 3000;

const app = express();

// Connecting to the local server

// mongoose.connect(process.env.DATABASE, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// mongoose.connection
//   .on('open', () => {
//     console.log('Mongoose connection open');
//   })
//   .on('error', (err) => {
//     console.log(`Connection error: ${err.message}`);
//   });

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

// app.use("/posts", () => {
//   console.log("This is middleware running");
// });

app.get('*', (req, res)=>res.send('Sorry mukwano, this page does not exist!'))
// Server
app.listen(PORT, () => {
  console.log(`Eavesdropping on port ${PORT} >>>`);
});

