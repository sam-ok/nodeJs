// Use express in the server by requiring it.

const path = require('path')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// We want to test if the mongoose connection is open
mongoose.connect("mongodb://localhost:27017/node-demo", {
    useNewUrlParser: true,
    useUnifiedTopology: true
},
    function (err) {
        if (err) throw err;
        console.log("Successfully connected");
    }
);


app.set('view engine', 'pug')
/*setting the view engine to pug so that the server knows that we are using pug.
View engine helps us to render what is on the backend to the front end.
Templating engine/ view engine.
Setting views as the directory for our views. 
Pug requires views directory set as well as static files
*/
app.set('view', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));

// Handling a GET request with the get method
/* (req, res) is a callback function and is the second argument for this get method.
It tells the browser what to do when the path is matched.
*/
// app.get('/', (req, res) => {
//     res.send('Hey there, you are good?')
// })

/*In the sendFile method above, we told Express to serve an index.html 
file that can be found in the root of your project folder.*/

/*__dirname means the direct path of the index.html 
file which in this case is the root/ same directory.*/
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

// TESTING TO SEE THAT THE SERVER IS HANDLING THE FORM.
// app.post('/', (req, res) => {
//     console.log('Hellooooooooooooooooo!')
// })


app.post('/', (req, res) => {
    console.log(req.body)
})


app.put('/', (req, res) => {
    console.log(req.body)
})

app.delete('/', (req, res) => {
    console.log(req.body)
})

app.get('*', (req, res) => {
    res.send("Error page")
})

app.get('/form1', (req, res) => {
    res.render('from1')
})


// PARAMS
app.get('/index/:name', (req, res) => {
    res.send('my path param is' + req.params.name)
})
// This is class ${req.query.class}`
// saves u the burden of the + sign and what type of data types u r dealing with


// Setting the server to listen on port 3300
app.listen(3000, function () {
    console.log('Eaves dropping on port 3000:');
});