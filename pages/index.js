
import { useEffect, useState } from 'react';
import axios from 'axios';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import MonthlyExpensesChart from '../components/MonthlyExpensesChart';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    axios.get('/api/transactions').then(res => setTransactions(res.data));
  }, []);

  const addTransaction = async (transaction) => {
    if (editData) {
      const updated = transactions.map(t => t.id === editData.id ? { ...editData, ...transaction } : t);
      setTransactions(updated);
      setEditData(null);
    } else {
      const res = await axios.post('/api/transactions', transaction);
      setTransactions([...transactions, res.data]);
    }
  };

  const deleteTransaction = async (id) => {
    await axios.delete('/api/transactions', { data: { id } });
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const editTransaction = (data) => setEditData(data);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Personal Finance Visualizer</h1>
      <TransactionForm onSubmit={addTransaction} initialData={editData} />
      <TransactionList transactions={transactions} onDelete={deleteTransaction} onEdit={editTransaction} />
      <MonthlyExpensesChart transactions={transactions} />
    </div>
  );
}
