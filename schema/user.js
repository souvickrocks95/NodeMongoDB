var mongoose = require('mongoose');  
var bcrypt = require('bcryptjs');
var salt = require('../saltGenerator.js');
var jwt = require('jsonwebtoken');
var {Observable, Subject, of, from,fromPromise} = require('rxjs');

var UserSchema = new mongoose.Schema({  
  name: String,
  email: String,
  password: String,
  token : String,
  document : Buffer,
  documentName : String,
  mimetype : String
});

UserSchema.virtual('tasks', {
  ref : 'Task',
  localField:'_id', 
  foreignField: 'owner'
});

UserSchema.methods.toJSON = function(){
  return {name : this.name, email : this.email, tasks : this.tasks, docUrl : this.docUrl};
}

UserSchema.methods.generateToken = function(){
  var token = jwt.sign({ name : this.name, email : this.email}, 'SECRET_KEY');
  this.token =token;
  this.save();
};

UserSchema.statics.findByCredential = function(email,password){
   return Observable.create( ob => {this.findOne(
    {email : email},function(err,data){
        if (data && bcrypt.compareSync(password,data.password)){
            ob.next(data);
        }else{
          ob.error(err);
        }
        ob.complete();
    });
  });
};

UserSchema.pre('save', function(next) {
  let user = this;
  if(user.isModified('password')){
    user.password = bcrypt.hashSync(user.password, salt);
  }
  next();
});

const model = mongoose.model('User', UserSchema);
module.exports = model