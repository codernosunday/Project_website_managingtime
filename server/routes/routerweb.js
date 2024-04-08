const express = require('express')
const router = express.Router()
const { getHomepage, getlogin, getuserhomepage, getQLgiangvien, getQL_gv, getQL_lopHP, getQL_TG_Giangday, get_exel_tool } = require('../controllers/homeController.js')


router.get('/', getHomepage)
router.get('/login', getlogin)
router.get('/userhome', getuserhomepage)
router.get('/manage', getQLgiangvien)
router.get('/manage/lophocphan', getQL_lopHP)
router.get('/manage/giangvien', getQL_gv)
router.get('/manage/thoigiangiangday', getQL_TG_Giangday)
router.get('/exeltool', get_exel_tool)
module.exports = router