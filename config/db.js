const mysql = require('mysql')
const dotenv = require('dotenv')
dotenv.config()

const db = mysql.createConnection({
    host : process.env.DB_HOST,
    database : process.env.DB_DATABASE,
    user : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    port : process.env.DB_PORT,
})

module.exports = db;