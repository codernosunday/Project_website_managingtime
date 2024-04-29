require('dotenv').config();
const mysql = require('mysql2');
const connection = mysql.createPool({
    host: process.env.HOST_DB,
    port: process.env.PORT_DB,
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE_DB,
    waitForConnections: true,
    connectionLimit: 200,
    queueLimit: 0
});
module.exports = connection;
