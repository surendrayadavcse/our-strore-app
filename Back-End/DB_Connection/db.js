const mongoose = require('mongoose');
require('dotenv').config(); // Ensure dotenv is loaded to access environment variables

const mongouri = process.env.MONGO_URI;

(async function connectDb() {
  try {
    // Options added to handle deprecation warnings
    await mongoose.connect(mongouri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to DB successfully');
  } catch (err) {
    console.error('Error while connecting to DB:', err);
  }
})();
