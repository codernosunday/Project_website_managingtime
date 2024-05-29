const ejs = require('ejs');
const bodyParser = require('body-parser');
//homepage
const getHomepage = (req, res) => {
    const connection = require('../config/database');
    connection.query('SELECT * FROM HocKy ', (error, results, fields) => {
        if (error) throw error;

        res.render('homepage.ejs', { hocky: results });
    });

}
const postHomepage = (req, res) => {
    const connection = require('../config/database');
    const data = req.body;
    var sql = `SELECT CanBoGiangDay, TenHocPhan, TenLopHocPhan, SiSo, TG_giangday 
    FROM LichGiangDay
    WHERE CanBoGiangDay = ? AND ID_HocKy = ?`;
    const values = [data.Hoten, data.Id_HocKy];
    connection.query(sql, values, (error, results, fields) => {
        if (error) {
            console.error("Error executing query:", error);
            res.status(500).json({ error: "Internal server error" }); // Gửi phản hồi lỗi nếu có lỗi trong quá trình truy vấn
            return; // Kết thúc hàm sau khi gửi phản hồi lỗi
        }
        res.json(results); // Gửi kết quả truy vấn nếu không có lỗi
    });
}
//
const getlogin = (req, res) => {
    return res.render('login.ejs');
}
const getuserhomepage = (req, res) => {
    const connection = require('../config/database');
    const data = req.body;
    const values = [data.Id_HocKy];
    var sql = 'select * from HocKy'
    connection.query(sql, values, (error, results, fields) => {
        if (error) {
            console.error("Error executing query:", error);
            res.status(500).json({ error: "Internal server error" }); // Gửi phản hồi lỗi nếu có lỗi trong quá trình truy vấn
            return;
        }
        res.render('userhomepage.ejs', { hocky: results });
    });
    // res.render('userhomepage.ejs', { hocky: results }); 'SELECT * FROM HocKy where id = ? '
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
    const data = req.body
    const sql = `DELETE FROM giangvien WHERE id = ?`
    const value = [data.id]
    connection.query(sql, value, (error, results, fields) => {
        if (error) {
            console.error('Lỗi truy vấn: ' + error.message);
            return;
        }
    })
}
//exel manage 
//insert lich giang day
const insert_lichgiangday = (req, res) => {
    const connection = require('../config/database')
    const { TG_Class_LyThuyet, TG_Class_ThucHanh } = require('../middleware/funtion_server')
    const data = req.body
    var TG_giangday
    data.forEach((item) => {
        const sql = `INSERT INTO LichGiangDay(MaHocPhan,TenHocPhan,SoTC,SoTiet,SoGio,
            TenLopHocPhan,SiSo,CanBoGiangDay,TuTuan,DenTuan,SoTietTrenTuan,ID_HocKy,TG_giangday)
        VALUES (?, ?, ?, ?, ? ,?,?, ?, ?, ?, ?,?,?);`

        if (item.SoTiet > 0 && item.SoGio == 0) {
            TG_giangday = TG_Class_LyThuyet(item.SiSo, item.SoTiet)
        }
        if (item.SoTiet == 0 && item.SoGio > 0) {
            TG_giangday = TG_Class_ThucHanh(item.SiSo, item.SoGio);
        }
        console.log(TG_giangday)
        var value = [item.MaHocPhan, item.TenHocPhan, item.SoTC, item.SoTiet, item.SoGio, item.TenLopHocPhan,
        item.SiSo, item.CanBoGiangDay, item.TuTuan, item.DenTuan, item.SoTietTrenTuan, item.Id_HocKy, TG_giangday]
        connection.query(sql, value, (error, results, fields) => {
            if (error) {
                console.error('Lỗi truy vấn: ' + error.message);
                return;
            }
        })
    })
}
module.exports =
{
    getHomepage, getlogin, getuserhomepage, getQLgiangvien, getQL_lopHP, getQL_TG_Giangday, getQL_gv,
    get_exel_tool, post_gv, delete_gv, insert_lichgiangday, postHomepage
}
