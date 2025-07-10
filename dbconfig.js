const dotenv = require("dotenv").config();
module.exports = {
    port: 1433,
    sql: {
        server: process.env.DATABASE_SERVER,
        database: process.env.DATABASE_NAME,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        options: {
            trustedConnection: true,
            enableArithAort: true,
            encrypt: false,
        },
    },
};
