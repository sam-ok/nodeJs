const fs = require('fs');
const { fileURLToPath } = require('url');

// console.log(fs.readdirSync('./'));

fs.readdir('#', (error, files) =>{
if(error) console.log('Error', error)
else console.log('Result', files)


})

