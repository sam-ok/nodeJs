const express = require('express');
const router = express.Router();

//specify what to do when user hits the `/about` route/endpoint/path
// show path params
router.get('/about/:name', (req,res)=>{
    res.send('Hello ' + req.params.name)
})

//show query params
router.get('/user', (req, res)=> {
    res.send('This is class ' + req.query.class + ' cohort ' +  req.query.cohort)
})

//testing in postman
router.put('/user', (req, res)=> {
    res.send('Got a PUT request at /user')
})

router.delete('/users', (req, res)=> {
    res.send('Got a DELETE request at /user')
})

module.exports = router;