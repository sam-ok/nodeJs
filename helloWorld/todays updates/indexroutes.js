const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration')

// specify what to do when user hit the '/'(home page) route/endpoint
router.get('/', (req,res)=>{
    res.render('form', { title: 'Registration form' })
})

// save data to the database
router.post('/', async(req,res)=>{
    try{
        const registration = new Registration(req.body);
        await registration.save(() => {
            console.log('save success')
            res.redirect('/userlist')
        })
    }
    catch(err) {
        res.status(400).send('Sorry! Something went wrong.')
        console.log(err)
    }   
})

// retrieve data from the database 
router.get('/userlist', async(req, res)=>{
    try{
        let items = await Registration.find()
        res.render('list', { users: items})
    }catch(err){
        res.status(400).send("Unable to find items in the database");
    }  
})

module.exports = router;