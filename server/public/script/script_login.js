function login() {
    var xhr = new XMLHttpRequest();
    var user = document.getElementById("us").value;
    var pass = document.getElementById("pass").value;
    const dataTable = document.getElementById("data-table");
    xhr.open('POST', '/login', true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {

        }
    };
    xhr.send(JSON.stringify({ Username: user, Password: pass }));
}