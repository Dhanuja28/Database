import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function App() {
  const [ledgers, setLedgers] = useState([]);

  useEffect(() => {
    fetch("http://192.168.1.121:5000/api/ledgers")
      .then(res => res.json())
      .then(data => setLedgers(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Ledger Report</Text>
      {ledgers.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.name}>{item.Ledname}</Text>
          <Text style={styles.balance}>{item.parent}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3
  },
  name: { fontSize: 18, fontWeight: "bold" },
  balance: { fontSize: 16, color: "green" }
});
