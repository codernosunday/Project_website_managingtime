const express = require('express')
const router = express.Router()
const { getHomepage, getlogin, getuserhomepage,
    getQLgiangvien, getQL_gv, getQL_lopHP, getQL_TG_Giangday,
    get_exel_tool, post_gv, delete_gv, insert_lichgiangday } = require('../controllers/homeController.js')


router.get('/', getHomepage)
router.get('/login', getlogin)
router.get('/userhome', getuserhomepage)
router.get('/manage', getQLgiangvien)
router.get('/manage/lophocphan', getQL_lopHP)
router.get('/manage/giangvien', getQL_gv)
router.get('/manage/thoigiangiangday', getQL_TG_Giangday)
router.get('/exeltool', get_exel_tool)
router.post('/update', post_gv)
router.post('/deletegiangvien', delete_gv)
//exel tool
router.get('/exeltool/insertgv', (req, res) => {
    const connection = require('../config/database');
    connection.query('SELECT * FROM HocKy ', (error, results, fields) => {
        if (error) throw error;
        // Render template EJS và truyền dữ liệu từ cơ sở dữ liệu
        res.render('insert_gv.ejs', { hocky: results });
    });
})
router.get('/exeltool/inserthp', (req, res) => {
    return res.render('insert_hp.ejs');
})
router.get('/exeltool/inserttggiangday', (req, res) => {
    return res.render('insert_tggiangday.ejs');
})
//post exel tool
router.post('/exeltool/insertlichgiangday', insert_lichgiangday)
module.exports = router