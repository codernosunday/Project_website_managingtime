document.getElementById("QL_gv").addEventListener("click", function () {
    window.location.href = "/manage/giangvien";
});
document.getElementById("QL_hp").addEventListener("click", function () {
    window.location.href = "/manage/lophocphan";
});
document.getElementById("QL_gd").addEventListener("click", function () {
    window.location.href = "/manage/thoigiangiangday";
});
// exel manage tool site
function changeInsert_gv() {
    var iframe = document.getElementById('iframe_view');
    iframe.src = '/exeltool/insertgv';
}
function changeInsert_hp() {
    var iframe = document.getElementById('iframe_view');
    iframe.src = '/exeltool/inserthp';
}
function changeInsert_tggiangday() {
    var iframe = document.getElementById('iframe_view');
    iframe.src = '/exeltool/inserttggiangday';
}