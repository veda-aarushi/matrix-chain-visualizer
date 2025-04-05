const express = require('express');
const cors = require('cors');
const matrixChainOrder = require('./mcm');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/mcm', (req, res) => {
  const { dimensions } = req.body;

  if (!Array.isArray(dimensions) || dimensions.length < 2) {
    return res.status(400).json({ error: 'Invalid dimensions array' });
  }

  try {
    const result = matrixChainOrder(dimensions);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Server error', detail: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`MCM backend running on http://localhost:${PORT}`);
});
