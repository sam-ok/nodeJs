const express = require('express');
const router = express.Router();

// specify what to do when user hit the '/'(home page) route/endpoint
router.get('/', (req,res)=>{
    res.render('form', { title: 'Registration form' })
})

router.post('/', (req,res)=>{
   console.log(req.body);
   res.render('form', { title: 'Registration form' })
})

module.exports = router;