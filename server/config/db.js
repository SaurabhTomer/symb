const mongoose = require('mongoose');

async function connectDB() {
  try {
    
  await mongoose.connect(MONGO_URI);
  console.log('MongoDB connected');
  } catch (error) {
    console.log("MongoDb error" , error);
    
  }
}

module.exports = connectDB;
