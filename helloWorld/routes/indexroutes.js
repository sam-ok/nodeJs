const express = require('express');
const router = express.Router();
const Registration = require('../model/Registration')

// specify what to do when user hit the '/'(home page) route/endpoint
router.get('/', (req,res)=>{
    res.render('form', { title: 'Registration form' })
})

router.post('/', (req,res)=>{

   console.log(req.body);
   
   const registration = new Registration(req.body);
   registration.save()
    .then(() => { res.send('Thank you for your registration!'); })
    .catch((err) => {
        console.log(err);
        res.send('Sorry! Something went wrong.');
    });

   res.render('form', { title: 'Registration form' })
})

module.exports = router;