var mongoose = require('mongoose');
const config = require('config');
const mongoCon = require('./config/mongoConfig');
const dbConfig = config.get('dbConfig');
const dbConfigenv = config.get('env');

const server = `${dbConfig.host}:${dbConfig.port}`;
const database = dbConfig.dbName;

class Database {

  static connect() {
    mongoose.connect(`mongodb://${server}/${database}`)
      .then(() => {
        console.log('Database connection successful')
      })
      .catch(err => {
        console.error('Database connection error');
      })
  }
}

module.exports = Database;