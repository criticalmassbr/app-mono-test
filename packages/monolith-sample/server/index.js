const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const postRoutes = require('./routes/posts');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('Failed to sync database:', err);
});
