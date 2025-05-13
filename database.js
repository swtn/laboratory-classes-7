const { MongoClient } = require('mongodb');
const { DB_USER, DB_PASS } = require('./config');

let database;

async function mongoConnect(callback) {
    const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@testcluster.vn6acok.mongodb.net/?retryWrites=true&w=majority&appName=testCluster`
    try {
        const client = new MongoClient(uri);
        await client.connect();
        database = client.db('shop');
        console.log("Connection to the database has been estabilished.");
        callback();
    } catch (err) {
        console.error("Database connection failed", err);
    }
}

function getDatabase() {
    if (!database) {
        throw new Error("No database found.");
    }
    return database;
}

module.exports = { mongoConnect, getDatabase };