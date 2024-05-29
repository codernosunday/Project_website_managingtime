window.addEventListener("load", function () {
    var tenGiangvien = document.getElementById("tenGiangvien")
    var tenHP = document.getElementById("tenHP")
    var tenlopHP = document.getElementById("tenlopHP")
    var Siso = document.getElementById("Siso")
    var save_btn = document.getElementById("save_btn")
    var del_btn = document.getElementById("del_btn")
    tenGiangvien.readOnly = true;
    tenHP.readOnly = true;
    tenlopHP.readOnly = true;
    Siso.readOnly = true;
    save_btn.disabled = true;
    del_btn.disabled = true
});
document.getElementById("form_enable").addEventListener("change", function () {
    var tenGiangvien = document.getElementById("tenGiangvien")
    var tenHP = document.getElementById("tenHP")
    var tenlopHP = document.getElementById("tenlopHP")
    var Siso = document.getElementById("Siso")
    var save_btn = document.getElementById("save_btn")
    var del_btn = document.getElementById("del_btn")
    tenGiangvien.readOnly = !this.checked;
    tenHP.readOnly = !this.checked;
    tenlopHP.readOnly = !this.checked;
    Siso.readOnly = !this.checked;
    save_btn.disabled = !this.checked;
    del_btn.disabled = !this.checked
});
document.getElementById("select_HocKy").addEventListener("change", function () {
    const selectedValue = document.getElementById("select_HocKy").value;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/userhomepagehocky', true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            if (data.length != 0) {
                document.getElementById("note").innerHTML = ""
                document.getElementById("table-container").innerHTML = "";
                var table = "<table class='table_css' id='data-search'><tr><th>Giảng viên</th><th>Tên học phần</th><th>Tên lớp học phần</th><th>Sĩ số</th><th>Số tiết</th><th>Số giờ</th><th>Thời gian giảng dạy(giờ)</th></tr>";
                for (var i = 0; i < data.length; i++) {
                    table += "<tr><td>" + data[i].CanBoGiangDay + "</td><td>"
                        + data[i].TenHocPhan + "</td><td>" + data[i].TenLopHocPhan
                        + "</td><td>" + data[i].SiSo + "</td><td>" + data[i].SoTiet + "</td><td>" + data[i].SoGio + "</td><td>" + data[i].TG_giangday + "</td></tr>";
                }
                table += "</table>";
                document.getElementById("table-container").innerHTML = table;
            } else {
                document.getElementById("table-container").innerHTML = "";
                document.getElementById("note").innerHTML = "<h1>Không có dữ liệu cho học kỳ này</h1>"
            }

        }
    };
    xhr.send(JSON.stringify({ Id_HocKy: selectedValue }));
});
function exportToExcel() {
    const table = document.getElementById("data-search");
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.table_to_sheet(table);

    // Apply styles to the header row
    const headerRow = table.rows[0];
    for (let i = 0; i < headerRow.cells.length; i++) {
        const cellAddress = XLSX.utils.encode_cell({ r: 0, c: i });
        if (!ws[cellAddress]) continue; // Check if the cell exists
        ws[cellAddress].s = {
            fill: { fgColor: { rgb: "FFFF00" } }, // Yellow background
            font: { sz: 15, bold: true, color: { rgb: "000000" } }, // Bold font
            alignment: { vertical: "center", horizontal: "center" }, // Center alignment
            border: {
                top: { style: "thin", color: { rgb: "000000" } },
                bottom: { style: "thin", color: { rgb: "000000" } },
                left: { style: "thin", color: { rgb: "000000" } },
                right: { style: "thin", color: { rgb: "000000" } }
            }
        };
    }

    // Apply styles to the rest of the table cells
    for (let r = 1; r < table.rows.length; r++) {
        for (let c = 0; c < table.rows[r].cells.length; c++) {
            const cellAddress = XLSX.utils.encode_cell({ r, c });
            if (!ws[cellAddress]) continue; // Check if the cell exists
            ws[cellAddress].s = {
                alignment: { vertical: "center", horizontal: "center" },
                border: {
                    top: { style: "thin", color: { rgb: "000000" } },
                    bottom: { style: "thin", color: { rgb: "000000" } },
                    left: { style: "thin", color: { rgb: "000000" } },
                    right: { style: "thin", color: { rgb: "000000" } }
                }
            };
        }
    }

    // Set column widths based on the header cell contents
    const colWidths = Array.from(headerRow.cells).map(cell => {
        return { wpx: cell.clientWidth }; // Adjust based on your preferences
    });
    ws['!cols'] = colWidths;

    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "table_data.xlsx");
}
