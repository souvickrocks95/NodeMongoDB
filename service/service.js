var User = require('../schema/user');
var {Observable, Subject, of} = require('rxjs');

var service = {
    create : (user) => {
      return  Observable.create(ob => {
        User.create(user, 
        function (err,user) {
            if (err)
                ob.error(err);
            else
                ob.next(user);
            ob.complete();
        });
      });
    },
    findByCredential : (email,password) => {
      return  User.findByCredential(email,password);
    },
    clearToken : function(user) {
      return Observable.create(ob => {
          user.token = null;
          user.save((err, data) => {
            if(err){
              ob.error(err);
            }else{
              ob.next(data);
            }
          })
      })
    },
    findAllUser : () => {
      return Observable.create(ob => {
          User.find({}, (err, data) => {
            if(err){
              ob.error(err);
            }else{
              ob.next(data);
            }
            ob.complete();
          })
      })
    },
    getData : (data) => {
      return Observable.create(obs => {
        if (!data){
          obs.error('Error');
        }else{
          obs.next(data);
        }
      })
    }
}

module.exports = service;