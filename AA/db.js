const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config(); 

const db_info = {
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || "3306",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "AA",
};


module.exports = {
  init: function () {
    return mysql.createPool({
      //connectionLimit: 10, 
      host: db_info.host,
      port: db_info.port,
      user: db_info.user,
      password: db_info.password,
      database: db_info.database,
    });
  },
  connect: function (conn) {
    conn.getConnection(function (err, connection) {
      if (err) {
        console.error("mysql connection error : " + err);
      } else {
        console.log("mysql is connected successfully!");
        connection.release(); 
      }
    });
  },
};
