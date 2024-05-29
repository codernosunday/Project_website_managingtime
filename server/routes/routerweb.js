const express = require('express')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const router = express.Router()
const { getHomepage, getlogin, getuserhomepage,
    getQLgiangvien, getQL_gv, getQL_lopHP, getQL_TG_Giangday,
    get_exel_tool, post_gv, delete_gv, insert_lichgiangday, postHomepage } = require('../controllers/homeController.js')

router.get('/', getHomepage)
router.post('/data_search_homepage', postHomepage)
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
router.post('/userhomepagehocky', (req, res) => {
    const connection = require('../config/database');
    const data = req.body;
    var sql = `SELECT CanBoGiangDay, TenHocPhan, TenLopHocPhan, SiSo,SoTiet,SoGio,TG_giangday 
    FROM LichGiangDay
    WHERE ID_HocKy = ?`;
    const values = [data.Id_HocKy];
    connection.query(sql, values, (error, results, fields) => {
        if (error) {
            console.error("Error executing query:", error);
            res.status(500).json({ error: "Internal server error" });
        }
        res.json(results);
    });
})
//Login_form
router.post('/login', (req, res) => {
    const connection = require('../config/database');
    const data = req.body;

    const sql = `SELECT * FROM User WHERE Username = ?`;
    console.log(data)
    const values = [data.Username];

    connection.query(sql, values, (error, results, fields) => {
        if (error) {
            console.error("Error executing query:", error);
            res.status(500).json({ error: "Internal server error" });
            return;
        }
        if (results.length > 0) {

            const userinfor = results[0];
            console.log(userinfor.Password)
            console.log(data.Password)
            if (userinfor.Password === data.Password) {
                res.cookie('username', userinfor.Username, { maxAge: 300000, httpOnly: true });
                res.redirect('/userhome');
            } else {
                res.send('Tên đăng nhập hoặc mật khẩu không đúng. <a href="/">Thử lại</a>');
            }
        } else {
            res.send('Tên đăng nhập hoặc mật khẩu không đúng. <a href="/">Thử lại</a>');
        }
    });
});
router.post('/exeltool/insertlichgiangday', insert_lichgiangday)
module.exports = router