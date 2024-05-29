function search_in_homepage() {
    var xhr = new XMLHttpRequest();
    var Id_HocKy = document.getElementById("select_HocKy").value;
    var Hoten = document.getElementById("hotengv").value;
    const dataTable = document.getElementById("data-table");
    xhr.open('POST', '/data_search_homepage', true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);

            if (data.length != 0) {
                document.getElementById("table-container").innerHTML = "";
                document.getElementById("note").innerHTML = "Thời gian giảng dạy của giảng viên: " + data[0].CanBoGiangDay
                var table = "<table class='table_css' id='data-search'><tr><th>Giảng viên</th><th>Tên học phần</th><th>Tên lớp học phần</th><th>Sĩ số</th><th>Thời gian giảng dạy</th></tr>";
                for (var i = 0; i < data.length; i++) {
                    table += "<tr><td>" + data[i].CanBoGiangDay + "</td><td>" + data[i].TenHocPhan + "</td><td>" + data[i].TenLopHocPhan + "</td><td>" + data[i].SiSo + "</td><td>" + data[i].TG_giangday + "</td></tr>";
                }
                table += "</table>";
                document.getElementById("table-container").innerHTML = table;
            } else {
                document.getElementById("table-container").innerHTML = "";
                document.getElementById("note").innerHTML = "Make sure you are right!"
            }

        }
    };
    xhr.send(JSON.stringify({ Id_HocKy: Id_HocKy, Hoten: Hoten }));
}
