const express = require("express");
const bodyParser = require("body-parser");

require("dotenv").config();
const app = express();
const PORT = process.env.PORT;
const { mssql, poolPromise } = require("./databaseconfig");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/postUserData", async (req, res) => {
    try {
        const { Name, Email, MobileNumber, Address, DateOfBirth, CreatedBy } = req.body;

        const pool = await poolPromise;
        const request = pool.request();

        request.input("Name", Name);
        request.input("Email", Email);
        request.input("MobileNumber", MobileNumber);
        request.input("Address", Address);
        request.input("DateOfBirth", DateOfBirth);
        request.input("CreatedBy", CreatedBy);

        const result = await request.query(`insert into tbUsers (Name, Email, MobileNumber, Address, DateOfBirth, CreatedBy)
            values (@Name, @Email, @MobileNumber, @Address, @DateOfBirth, @CreatedBy)`)

        res.status(200).json({ "message": "User data inserted successfully", "result": result });

    } catch (error) {
        console.error("Error processing request:", error);
    }
});


app.get("/api/getUserData", async (req, res) => {
    try {
        const pool = await poolPromise;
        const request = pool.request();
        const result = await request.query("SELECT * FROM tbUsers");

        res.status(200).json({
            "message": "User data retrieved successfully",
            "result": result.recordset
        });

    } catch (error) {
        console.error("Error processing request:", error);
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});