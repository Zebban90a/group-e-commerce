const mongoose = require('mongoose');
const server = require('./App');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const db = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
// eslint-disable-next-line no-console
mongoose.connect(db).then(() => console.log('connected successfully'));
server.listen(PORT, () => `Server running on port ${PORT}`);
