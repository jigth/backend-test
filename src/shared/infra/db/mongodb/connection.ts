const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;

export const mongodbClient = new MongoClient(uri);
export const mongodbDatabase = mongodbClient.db('backend-test');