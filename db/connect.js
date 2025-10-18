const { MongoClient } = require('mongodb');

let _db; // holds the DB instance

const initDb = async (cb) => {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    _db = client.db(process.env.DB_NAME || 'tasks-api'); // lock to your DB
    console.log('Mongo connected to DB:', _db.databaseName);
    cb();
  } catch (err) {
    cb(err);
  }
};

const getDb = () => {
  if (!_db) throw Error('Database not initialized!');
  return _db; // use directly: getDb().collection('tasks')
};

module.exports = { initDb, getDb };
