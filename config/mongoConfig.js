const { MongoMemoryServer } = require('mongodb-memory-server');
const config = require('config');
const dbConfig = config.get('dbConfig');

var mogod = null;
function create() {

    mongod = new MongoMemoryServer({
        instance: {
            port: dbConfig.port, // by default choose any free port
            ip: dbConfig.host, // by default '127.0.0.1', for binding to all IP addresses set it to `::,0.0.0.0`,
            dbName: dbConfig.dbName // by default generate random dbName
        }
    });

    console.log(mongod.getInstanceInfo());
}

function stopServer() {
    if (mongod != null)
        await mongod.stop();
}

//connect();
module.exports = {create, stopServer};