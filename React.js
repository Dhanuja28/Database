import { useEffect, useState } from "react";

function LedgerReport() {
  const [ledgers, setLedgers] = useState([]);

  useEffect(() => {
    fetch("http://192.168.1.121:5000/api/ledgers")
      .then(res => res.json())
      .then(data => setLedgers(data));
  }, []);

  return (
    <table border="1">
      <thead>
        <tr>
          <th>LedName</th>
          <th>Parent</th>
          <th>Billwise</th>
        </tr>
      </thead>
      <tbody>
        {ledgers.map((l, i) => (
          <tr key={i}>
            <td>{l.LedgerName}</td>
            <td>{l.ParentGroup}</td>
            <td>{l.Billwise}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default LedgerReport;
