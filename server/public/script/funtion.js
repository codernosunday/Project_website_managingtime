function serverdata() {
    var id = document.getElementById("id_giangvien").value;
    var hoten = document.getElementById("htgv").value;
    var chuyen_nganh = document.getElementById("chnganh").value;
    var sdt_gv = document.getElementById("sdt").value;
    var email_gv = document.getElementById("email").value;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/update", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Xử lý dữ liệu trả về nếu cần
            var response = JSON.parse(xhr.responseText);
            console.log("Dữ liệu mới: ", response);
        }
    };
    xhr.send(JSON.stringify({ id: id, hoten: hoten, chuyen_nganh: chuyen_nganh, sdt_gv: sdt_gv, email_gv: email_gv }));
    location.reload();
}
function delete_data() {
    var id = document.getElementById("id_giangvien").value;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/deletegiangvien", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            console.log("Dữ liệu xoá: ", response);
        }
    };
    xhr.send(JSON.stringify({ id: id }));
    location.reload();
}
//add database
var file
// exel
function uploadExcel() {
    var fileInput = document.getElementById('excelFileInput');
    file = fileInput.files[0]; // Lấy file đã chọn
    if (file) {
        var reader = new FileReader(); // Tạo đối tượng FileReader
        reader.onload = function (event) {
            var data = new Uint8Array(event.target.result);
            var workbook = XLSX.read(data, { type: 'array' });

            var sheetName = workbook.SheetNames[0];
            var sheet = workbook.Sheets[sheetName];

            var htmlTable = `<table class="table_css" id="tablegv_data">`; // Bắt đầu bảng HTML

            // Duyệt qua từng hàng của sheet
            var range = XLSX.utils.decode_range(sheet['!ref']);
            for (var rowIndex = range.s.r; rowIndex <= range.e.r; rowIndex++) {
                htmlTable += '<tr>'; // Bắt đầu hàng mới

                // Duyệt qua từng ô của hàng
                for (var colIndex = range.s.c; colIndex <= range.e.c; colIndex++) {
                    var cellAddress = { c: colIndex, r: rowIndex }; // Địa chỉ ô
                    var cellRef = XLSX.utils.encode_cell(cellAddress); // Mã hóa địa chỉ ô
                    var cell = sheet[cellRef]; // Lấy giá trị của ô

                    // Kiểm tra nếu ô không rỗng
                    if (cell) {
                        var cellValue = cell.v; // Lấy giá trị của ô
                        htmlTable += '<td>' + cellValue + '</td>'; // Thêm ô vào hàng
                    }
                }

                htmlTable += '</tr>';
            }

            htmlTable += '</table>';

            document.getElementById('tableContainer').innerHTML = htmlTable; // Hiển thị bảng HTML
        };

        reader.readAsArrayBuffer(file);
    } else {
        console.log("Không có file được chọn.");
    }
}
// add data giang vien
function addData_lichgiangday() {
    var tableRows = document.querySelectorAll("#tablegv_data tr");
    var Id_HocKy = document.getElementById("select_HocKy").value;
    var data = [];
    // Duyệt qua từng hàng của bảng, bỏ qua hàng đầu tiên (tiêu đề)
    for (var i = 1; i < tableRows.length; i++) {
        var cells = tableRows[i].querySelectorAll("td");
        var rowData = {
            MaHocPhan: cells[0].innerText,
            TenHocPhan: cells[1].innerText,
            SoTC: cells[2].innerText,
            SoTiet: cells[3].innerText,
            SoGio: cells[4].innerText,
            TenLopHocPhan: cells[5].innerText,
            SiSo: cells[6].innerText,
            CanBoGiangDay: cells[7].innerText,
            TuTuan: cells[8].innerText,
            DenTuan: cells[9].innerText,
            SoTietTrenTuan: cells[10].innerText,
            Id_HocKy: Id_HocKy
        };
        data.push(rowData);
    }
    // Gửi dữ liệu lên máy chủ bằng AJAX
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/exeltool/insertlichgiangday', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                document.getElementById('message').innerText = 'Dữ liệu đã được thêm vào CSDL.';
            } else {
                document.getElementById('message').innerText = 'Có lỗi xảy ra khi thêm dữ liệu vào CSDL.';
            }
        }
    };
    xhr.send(JSON.stringify(data));
}

