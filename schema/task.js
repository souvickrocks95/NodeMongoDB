var mongoose = require('mongoose');  
var bcrypt = require('bcryptjs');
var salt = require('../saltGenerator.js');
var jwt = require('jsonwebtoken');
var {Observable, Subject, of, from,fromPromise} = require('rxjs');

var taskSchema = new mongoose.Schema({  
    description: {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    completed : {
        type : Boolean,
        required : true,
        default : false
    },
    owner : {
        type : mongoose.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    createdDate : {
        type : Date,
        default : new Date()
    }
});

const model = mongoose.model('Task', taskSchema);
module.exports = model