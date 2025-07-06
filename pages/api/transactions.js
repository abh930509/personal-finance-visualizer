
let transactions = [];

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(transactions);
  } else if (req.method === 'POST') {
    const { amount, date, description } = req.body;
    const id = Date.now();
    transactions.push({ id, amount, date, description });
    res.status(201).json({ id, amount, date, description });
  } else if (req.method === 'DELETE') {
    const { id } = req.body;
    transactions = transactions.filter(t => t.id !== id);
    res.status(204).end();
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
