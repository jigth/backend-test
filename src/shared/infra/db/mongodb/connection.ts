const { MongoClient } = require('mongodb');

// Sane default URI was provided as it was already exposed in the docker compose file.
const uri = process.env.MONGODB_URI ?? 'mongodb://root:example@localhost:27017/backend-test?authSource=admin';

export const mongodbClient = new MongoClient(uri);
export const mongodbDatabase = mongodbClient.db('backend-test');