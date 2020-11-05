const express = require('express');
const form1Routes = express();

  //Render pug
  form1Routes.get("/form1", (req, res) => {
    res.render("form1");
  });
  
  // Routing for positing
  form1Routes.post('/form1', (req, res) => {
    console.log(req.body);
    // significance of the end method. 
    /*why aren't we passing it with express and yet it is used on the http 
    module from which the express framework is built*/
    res.end();
  })

  module.exports = form1Routes;