var app = require('./app');
const config = require('config');

console.log(config.env);
var port = process.env.PORT || 3000;
var server = app.listen(port, function() {
  console.log(server.address());
  console.log('Express server listening on port ' + port);
});