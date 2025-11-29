const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();

// Accept text (Tally sends text, not JSON)
app.use(bodyParser.text({ type: "*/*" }));

app.post("/tallyjson", (req, res) => {
    console.log("RAW BODY FROM TALLY:");
    console.log(req.body);

    let raw = req.body;

    // Extract JSON only from body
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
        return res.status(400).send("JSON not found in request");
    }

    let cleanJSON = jsonMatch[0];
    let jsonData;

    try {
        jsonData = JSON.parse(cleanJSON);
    } catch (err) {
        console.log("JSON Parse Error:", err);
        return res.status(400).send("Invalid JSON sent from Tally");
    }

    if (!jsonData.Ledger || !Array.isArray(jsonData.Ledger)) {
        return res.status(400).send("Ledger array missing");
    }

    // Create DB connection from query string
    const db = mysql.createConnection({
        host: req.query.host,
        user: req.query.user,
        password: req.query.password,
        database: req.query.database
    });

    db.connect(err => {
        if (err) return res.status(500).send("DB Connection Failed: " + err);
    });

    const ledgerRows = jsonData.Ledger;
    let inserted = 0;

    ledgerRows.forEach(row => {
        db.query(
            "INSERT INTO Ledger (LedName, Parent, Billwise) VALUES (?, ?, ?)",
            [row?.LedName, row?.LedParent, row?.LedBillwise],
            err => {
                if (err) console.log("Insert Error:", err);
                else inserted++;
            }
        );
    });

    res.send(`Inserted ${inserted} ledger records successfully.`);
});

app.listen(5000, () => console.log("Server running on port 5000"));