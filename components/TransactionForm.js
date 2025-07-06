
import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';

const TransactionForm = ({ onSubmit, initialData }) => {
  const [form, setForm] = useState({ amount: '', date: '', description: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.amount || !form.date || !form.description) {
      setError('All fields are required');
      return;
    }
    if (Number(form.amount) <= 0) {
      setError('Amount must be greater than 0');
      return;
    }
    setError('');
    onSubmit(form);
    setForm({ amount: '', date: '', description: '' });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {error && <p className={styles.error}>{error}</p>}
      <input type="number" name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} step="0.01" required className={styles.formInput} />
      <input type="date" name="date" value={form.date} onChange={handleChange} required className={styles.formInput} />
      <input type="text" name="description" placeholder="Description" value={form.description} onChange={handleChange} required className={styles.formInput} />
      <button type="submit" className={styles.button}>{initialData ? 'Update' : 'Add'} Transaction</button>
    </form>
  );
};

export default TransactionForm;
