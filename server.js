const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql2');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "testconnection",
  database: "tallydata"
});

// Test Route
app.get("/api/ledgers", (req, res) => {
  const query = "SELECT LedName, Parent, Billwise FROM Ledger";
  
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.listen(5000, () => {
  console.log("✔ API Running at http://192.168.1.121:5000");
});
