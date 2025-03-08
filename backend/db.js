const mongoose = require('mongoose');

// Determine MongoDB URI based on environment
function getMongoURI() {
  // Railway provides MONGODB_URL for MongoDB plugin
  if (process.env.RAILWAY_ENVIRONMENT) {
    return process.env.MONGODB_URL || process.env.MONGODB_URI;
  }
  // For local Docker or other environments
  return process.env.MONGODB_URI;
}

// MongoDB connection function
const connectDB = async () => {
  try {
    const mongoURI = getMongoURI();
    
    // Hide credentials in logs
    const logURI = mongoURI.replace(
      /mongodb(\+srv)?:\/\/([^:]+):([^@]+)@/,
      'mongodb$1://******:******@'
    );
    
    console.log(`Attempting MongoDB connection to ${logURI}`);
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 30000,
    });
    
    console.log('MongoDB connected successfully');
    
    // Initialize database with default settings
    await initializeDatabase();
    
  } catch (err) {
    console.error('MongoDB connection error:', err);
    // Exit process with failure in production, otherwise continue
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

// Initialize database with necessary default data
const initializeDatabase = async () => {
  try {
    // Import models
    const Settings = require('./models/settings.model');
    
    // Ensure default settings exist
    await Settings.findOrCreate();
    console.log('Database initialized with default settings');
  } catch (err) {
    console.error('Error initializing database:', err);
  }
};

module.exports = connectDB;
