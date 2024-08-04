const { MongoClient } = require('mongodb');

// Sane default URI was provided as it was already exposed in the docker compose file.
const uri = process.env.MONGODB_URI ?? 'mongodb://root:example@localhost:27017/backend-test?authSource=admin';
const db_name = process.env.MONGODB_DATABASE_NAME ?? 'backend-test';

export const mongodbClient = new MongoClient(uri);
export const mongodbDatabase = mongodbClient.db(db_name);

// Connect to MongoDB
async function connectToDatabase() {
  try {
    await mongodbClient.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }
}

connectToDatabase().catch((err) => console.log(`Error while connecting to MongoDB client ${err}`));

// Handle close connection when app is finished to free allocated resources for MongoDB connection.
process.on('SIGINT', async () => {
  try {
    await mongodbClient.close();
    console.log('MongoDB connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error closing MongoDB connection', error);
    process.exit(1);
  }
});
