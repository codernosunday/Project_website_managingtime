const ejs = require('ejs');
const bodyParser = require('body-parser');
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
//làm việc với sever giảng viên 
const post_gv = (req, res) => {
    const data = req.body

    const connection = require('../config/database');
    const sql = `UPDATE giangvien
    SET hoten= ?, chuyen_nganh=?,sdt_gv=?,email_gv=?
    WHERE id = ?`
    const value = [data.hoten, data.chuyen_nganh, data.sdt_gv, data.email_gv, data.id]
    connection.query(sql, value, (error, results, fields) => {
        if (error) {
            console.error('Lỗi truy vấn: ' + error.message);
            return;
        }
        console.log('Số dòng được cập nhật: ' + results.affectedRows);
    })
}
const delete_gv = (req, res) => {
    const connection = require('../config/database');
    console.log("test", req.body)
    const data = req.body
    const sql = `DELETE FROM giangvien WHERE id = ?`
    const value = [data.id]
    connection.query(sql, value, (error, results, fields) => {
        if (error) {
            console.error('Lỗi truy vấn: ' + error.message);
            return;
        }
        console.log('Số dòng được cập nhật: ' + results.affectedRows);
    })
}
//exel manage 
//insert lich giang day
const insert_lichgiangday = (req, res) => {
    const connection = require('../config/database')
    console.log("test", req.body)
    const data = req.body
    data.forEach((item) => {
        const sql = `INSERT INTO LichGiangDay(MaHocPhan,TenHocPhan,SoTC,SoTiet,SoGio,
            TenLopHocPhan,SiSo,CanBoGiangDay,TuTuan,DenTuan,SoTietTrenTuan,ID_HocKy)
        VALUES (?, ?, ?, ?, ? ,?,?, ?, ?, ?, ?,?);`
        var value = [item.MaHocPhan, item.TenHocPhan, item.SoTC, item.SoTiet, item.SoGio, item.TenLopHocPhan,
        item.SiSo, item.CanBoGiangDay, item.TuTuan, item.DenTuan, item.SoTietTrenTuan, item.Id_HocKy]
        connection.query(sql, value, (error, results, fields) => {
            if (error) {
                console.error('Lỗi truy vấn: ' + error.message);
                return;
            }
            console.log('Số dòng được cập nhật: ' + results.affectedRows);
        })
    })
}
module.exports =
{
    getHomepage, getlogin, getuserhomepage, getQLgiangvien, getQL_lopHP, getQL_TG_Giangday, getQL_gv,
    get_exel_tool, post_gv, delete_gv, insert_lichgiangday
}
