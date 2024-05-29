require('dotenv').config()

const ejs = require('ejs');
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = 3000 || process.env.port
const viewsconfig = require('./config/viewsconfig')
const webroute = require('./routes/routerweb.js')
viewsconfig(app)
app.use('/', webroute)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})