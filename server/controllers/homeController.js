const ejs = require('ejs');
const getHomepage = (req, res) => {

    return res.render('homepage.ejs');
}
const getlogin = (req, res) => {
    return res.render('login.ejs');
}
const getuserhomepage = (req, res) => {
    return res.render('userhomepage.ejs');
}
const getQLgiangvien = (req, res) => {
    return res.render('manage.ejs');
}
const getQL_gv = (req, res) => {
    const connection = require('../config/database');
    connection.query('SELECT * FROM giangvien', (error, results, fields) => {
        if (error) throw error;

        // Render template EJS và truyền dữ liệu từ cơ sở dữ liệu
        res.render('QL_giangvien.ejs', { giangvien: results });
    });
}
const getQL_lopHP = (req, res) => {
    return res.render('QL_LopHP.ejs');
}
const getQL_TG_Giangday = (req, res) => {
    return res.render('QL_TGgiangday.ejs');
}
const get_exel_tool = (req, res) => {
    return res.render('exelmanage.ejs')
}
module.exports =
{
    getHomepage, getlogin, getuserhomepage, getQLgiangvien, getQL_lopHP, getQL_TG_Giangday, getQL_gv,
    get_exel_tool
}
