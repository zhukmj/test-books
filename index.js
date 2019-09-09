const mongoose = require('mongoose');


const {
  MONGO_HOST,
  MONGO_PORT,
  MONGO_DB,
} = process.env;
const db = mongoose.connection;

mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`, { useNewUrlParser: true });

db.on('error', (error) => {
  console.error('DB CONNECTION ERROR:', error);
});

db.once('open', () => {
  require('./api/server');
});
