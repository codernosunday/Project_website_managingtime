const path = require('path')
express = require('express')
const viewsconfig = (app) => {
    // config views

    app.set('views', path.join('./server', 'views'))
    app.set('view engine', 'ejs')
    //config static file
    app.use(express.static(path.join('./server', 'public')))
    app.use(express.static(path.join('./server/public', 'image')))
}
module.exports = viewsconfig;