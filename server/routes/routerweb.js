const express = require('express')
const router = express.Router()
const { getHomepage, getlogin, getuserhomepage } = require('../controllers/homeController.js')


router.get('/', getHomepage)
router.get('/login', getlogin)
router.get('/userhome', getuserhomepage)
module.exports = router