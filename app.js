var express = require('express');
var app = express();
var db = require('./db');
const config = require('config');
const env = config.get('env');
const testMongoConfig = require('./config/mongoConfig');
var UserController = require('./controller/usercontroller');
const authController = require('./controller/authController');
const taskController = require('./controller/taskController');

if (env == 'Test') {
    testMongoConfig.create();
}
db.connect();

app.use((req, res, next) => {
    console.log(`This is request : ${req.method} and ${req.url}`);
    next();
});
app.use('/users', UserController);
app.use('/auth', authController);
app.use('/tasks', taskController);

module.exports = app;
