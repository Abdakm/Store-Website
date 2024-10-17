const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const e_commersRoutes = require('./src/products/routes');

app.use('/e_commers', e_commersRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
