const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration')

// specify what to do when user hit the '/'(home page) route/endpoint
router.get('/', (req, res) => {
    res.render('form', { title: 'Registration form' })
});

// save data to the database
router.post('/', async (req, res) => {
    try {
        const items = new Registration(req.body);
        await Registration.register(items, req.body.password , (err) => {
            if (err)
              { 
               throw err
              }
            res.redirect('/login')
        })
    }
    catch (err) {
        res.status(400).send('Sorry! Something went wrong.')
        console.log(err)
    }
});

// retrieve data from the database 
router.get('/userlist', async (req, res) => {
    if (req.session.user) {
        try {
            let items = await Registration.find()
            if (req.query.gender) {
                items = await Registration.find({ gender: req.query.gender })
            }
            res.render('list', { title: 'User list', users: items, currentUser:req.session.user})
        } catch (err) {
            res.status(400).send("Unable to find items in the database");
        }
    }else {
        console.log("Can't find session")
        res.redirect('/login')
    }
})

router.post('/delete', async (req, res) => {
    if (req.session.user) {
        try {
            await Registration.deleteOne({ _id: req.body.id })
            res.redirect('back')
        } catch (err) {
            res.status(400).send("Unable to delete item in the database");
        }
    }else {
            console.log("Can't find session")
            res.redirect('/login')
        }
});

router.get('/update/:id', async (req, res) => {
    if (req.session.user) {
        try {
            const updateUser = await Registration.findOne({ _id:req.params.id })
            res.render('updatepage', { user: updateUser })
        } catch (err) {
            res.status(400).send("Unable to find item in the database");
        }
    }else {
        console.log("Can't find session")
        res.redirect('/login')
    }
});

router.post('/update', async (req, res) => {
if (req.session.user) {
    try {
        await Registration.findOneAndUpdate({_id:req.query.id}, req.body)
        res.redirect('userlist');
    } catch (err) {
        res.status(404).send("Unable to update item in the database");
    } 
}else {
    console.log("Can't find session")
    res.redirect('/login')
}   
});

router.get('/farmerdash', async (req, res) => {
    if (req.session.user) {
        try {
            res.render('farmer', {title: 'Farmer form', currentUser:req.session.user,currentRole:req.session.role})
        } catch (err) {
        } 
    }else {
        console.log("Can't find session")
        res.redirect('/login')
    }   
    })
module.exports = router;