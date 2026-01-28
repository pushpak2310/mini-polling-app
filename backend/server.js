
const express = require('express');
const cors = require('cors');
const pollRoutes = require('./routes/pollRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/polls', pollRoutes);

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
