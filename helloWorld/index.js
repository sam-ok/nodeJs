// import express in our project using require key word

//dependencies
const express = require('express')
const bodyParser = require('body-parser')
const indexRoutes = require('./routes/indexroutes');
const teachingRoutes = require('./routes/teachingroutes');
const loginRoutes = require('./routes/loginroutes');
require('dotenv').config();
const mongoose = require('mongoose');
const Registration = require('./models/Registration')
const expressSession = require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
});
const passport = require('passport');


// create an express application by calling the express() function
// Instantiations
const app = express();

//db connection
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

mongoose.connection
  .on('open', () => {
    console.log('Mongoose connection open');
  })
  .on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
  });

//Configs
app.set('view engine', 'pug');
app.set('views', './views');

// middleware settings
//Simple request time logger for a specific route
app.use((req, res, next) => {
  console.log('A new request received at ' + Date.now());
  next();
});

app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());

// passport configs
passport.use(Registration.createStrategy());
passport.serializeUser(Registration.serializeUser());
passport.deserializeUser(Registration.deserializeUser());

app.use('/', indexRoutes);
app.use('/teaching', teachingRoutes);
app.use('/login', loginRoutes);

//logout
app.post('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        // failed to destroy session
      } else {
        return res.redirect('/login');
      }
    })
  }
})


app.get('*', (req, res) => {
  res.send('error page')
})


//server
//created a server and have it listen on port 3000
app.listen(3000, () => console.log('listening on port 3000'))
