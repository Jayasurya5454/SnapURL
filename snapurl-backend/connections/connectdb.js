const mongoose = require('mongoose');
require('dotenv').config();

const connectdb = async () => {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('Connected to database');
  }).catch((error) => {
    console.log('Error connecting to database', error);
  });
}

module.exports = connectdb;
