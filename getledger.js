const express = require("express");
const mysql = require("mysql");

const app = express();
app.use(express.json());

// POST API - Get Ledger Data
app.post("/ledgers", (req, res) => {

    const { host, user, password, database } = req.body;

    if (!host || !user || !database) {
        return res.status(400).json({ error: "Missing required DB parameters" });
    }

    // Create connection dynamically
    const db = mysql.createConnection({
        host,
        user,
        password,
        database
    });

    // Connect
    db.connect((err) => {
        if (err) {
            console.log("MySQL Connection Error:", err);
            return res.status(500).json({ error: err.message });
        }

        // Query
        db.query("SELECT * FROM ledgers", (err, result) => {
            if (err) {
                console.log("MySQL Query Error:", err);
                return res.status(500).json({ error: err.message });
            }

            res.json({
                Ledger: result
            });
        });
    });
});

// Run server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});