const express = require('express')
const bodyParser = require('body-parser')
const user = require('./routes/user')
var cors = require("cors");

// create Express app
const app = express()

// Enable CORS
app.use(cors());


// express will make raw requests into properties that will be available on the 
// request.body object
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))


// routes is handled here!
app.use('/user', user);
app.get('/', (req, res) => {
  res.send("Simple CRUD API")
})


// export the file, so we can start the site in start.js
module.exports = app;