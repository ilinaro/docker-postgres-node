const Pool = require('pg').Pool
const pool = new Pool({
    user: "root",
    password: "root",
    host: "localhost",
    port: 5432,
    database: "my_db"
})

module.exports = pool