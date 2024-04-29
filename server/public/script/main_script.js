//trang web
var btn = document.getElementById("button_update")
var idgv = document.getElementById("id_giangvien")
var btn_delete = document.getElementById("button_delete")
window.addEventListener("load", function () {
    btn.disabled = true;
    idgv.disabled = true;
    btn_delete.disabled = true;
    var hoten = document.getElementById("htgv");
    var chuyen_nganh = document.getElementById("chnganh");
    var sdt_gv = document.getElementById("sdt");
    var email_gv = document.getElementById("email");
    hoten.readOnly = true;
    chuyen_nganh.readOnly = true;
    sdt_gv.readOnly = true;
    email_gv.readOnly = true
});
// table giang vien
var tableRows = document.querySelectorAll("#giang_vien_table tr");
var rowsArray = Array.from(tableRows);
rowsArray.shift()
rowsArray.forEach(row => {
    row.addEventListener("click", function () {
        var id = this.cells[0].innerText;
        var name = this.cells[1].innerText;
        var chuyen_nganh = this.cells[2].innerText;
        var sdt_gv = this.cells[3].innerText;
        var emai_gv = this.cells[4].innerText;
        document.getElementById("id_gv").textContent = "Thông tin:" + name;
        document.getElementById("id_giangvien").value = id;
        document.getElementById("htgv").value = name;
        document.getElementById("chnganh").value = chuyen_nganh;
        document.getElementById("sdt").value = sdt_gv;
        document.getElementById("email").value = emai_gv
    });
});
//form giang vien
//checkbox
document.getElementById("enableForm").addEventListener("change", function () {

    btn.disabled = !this.checked;
    var hoten = document.getElementById("htgv");
    var chuyen_nganh = document.getElementById("chnganh");
    var sdt_gv = document.getElementById("sdt");
    var email_gv = document.getElementById("email");
    hoten.readOnly = !this.checked;
    chuyen_nganh.readOnly = !this.checked;
    sdt_gv.readOnly = !this.checked;
    email_gv.readOnly = !this.checked;
    btn_delete.disabled = !this.checked;
});

