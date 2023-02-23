const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mern-shopping', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () =>
console.log('Connected to mongodb endpoint'));

module.exports = mongoose.connection;
