var mongoose = require('mongoose');
const config = require('config');

const dbConfig = config.get('dbConfig');

const server = `${dbConfig.host}:${dbConfig.port}`; 
const database = dbConfig.dbName;   

class Database {
    constructor() {
      this.connect()
    }

    connect() {
        mongoose.connect(`mongodb://${server}/${database}`)
          .then(() => {
            console.log('Database connection successful')
          })
          .catch(err => {
            console.error('Database connection error')
          })
     }
   }
   
   module.exports = new Database()