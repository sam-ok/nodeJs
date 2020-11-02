const path = require("path");
const express = require("express");
const mongoose = require('mongoose');
require('dotenv/config');

const app = express();

// setting up pug
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
// Connecting to the public folder
app.set(express.static(path.join(__dirname, 'public')));

// app.use("/posts", () => {
//     console.log("This is middleware running");
// });

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/form", (req, res) => {
    res.render("form");
});

app.post('/form', (req, res) => {
    console.log(req.body)
    res.render("thanks");
})

app.listen(3000, () => {
    console.log("Eavesdropping on port 3000:");
});
