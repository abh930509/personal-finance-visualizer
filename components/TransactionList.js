
import styles from '../styles/Home.module.css';

const TransactionList = ({ transactions, onDelete, onEdit }) => {
  if (transactions.length === 0) {
    return <p className={styles.error}>No transactions added yet.</p>;
  }

  return (
    <ul className={styles.transactionList}>
      {transactions.map((transaction) => (
        <li key={transaction.id} className={styles.transactionItem}>
          <div>
            <strong>{transaction.description}</strong><br />
            <span>${Number(transaction.amount).toFixed(2)} on {new Date(transaction.date).toLocaleDateString()}</span>
          </div>
          <div>
            <button className={styles.transactionButton} onClick={() => onEdit(transaction)}>✏️</button>{' '}
            <button className={styles.transactionButton} onClick={() => { if (confirm('Are you sure?')) onDelete(transaction.id); }}>🗑️</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TransactionList;
