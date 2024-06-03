require("dotenv").config;
const Pool = require("pg").Pool;
// const Pool2 = require("pg").Pool2;

const pool2 = new Pool({
    user: "postgres",
    password: "India@123",
    host: "localhost",
    port: 5432,
    database: "qcusers"
});


const pool = new Pool({
    user: "postgres",
    password: "India@123",
    host: "localhost",
    port: 5432,
    database: "bluefly"
});

module.exports = {pool, pool2};