var embeddedMongoDB = require('node-embedded-mongodb');

function connect() {

    console.log('Here');

    embeddedMongoDB.silentMode(true);

    embeddedMongoDB.start(null, null, function (err) {

    });
}

module.exports = connect;