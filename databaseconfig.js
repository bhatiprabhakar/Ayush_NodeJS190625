const mssql = require('mssql');
const dbConfig = require("./dbconfig");

const poolPromise = new mssql.ConnectionPool(dbConfig.sql)
    .connect()
    .then((pool) => {
        console.log("Connected with MS SQL");
        return pool;
    })
    .catch((err) => console.log("Database Connection Failed! Bad Config: ", err));

module.exports = {
    mssql,
    poolPromise,
};
