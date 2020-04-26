var express = require('express');
var app = express();
var db = require('./db');
var UserController = require('./controller/usercontroller');
const authController = require('./controller/authController');
const taskController = require('./controller/taskController');

app.use((req,res,next) => {
    console.log(`This is request : ${req.method} and ${req.url}`);
    next();
});
app.use('/users', UserController);
app.use('/auth', authController);
app.use('/tasks',taskController);

module.exports = app;
