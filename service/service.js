var User = require('../schema/user');
var {Observable, Subject, of} = require('rxjs');
const server = require('../server');
var fs = require('fs');
const notification = require('../notification');

var service = {
    create : (user) => {
      return  Observable.create(ob => {
        User.create(user, 
        function (err,user) {
            if (err)
                ob.error(err);
            else{
              notification.sendMail({
                to: user.email,
                subject: 'Node',
                text: 'Welcome to Node Project',
                html: '<strong>and easy to do anywhere, even with Node.js</strong>',
              });
              ob.next(user);
            }
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
          data.populate('tasks')
          .execPopulate(() => {
            console.log( server);
              obs.next(data);
              obs.complete();
            })
        }
      })
    },
    upload : (data, id) => {
      return Observable.create(obs => {
        if (!data){
          obs.error('Error');
        }else{
            User.findByIdAndUpdate(id, {document : data.buffer, documentName : data.originalname, mimetype : data.mimetype}, (err, data) => {
              if(err)
              obs.error('Error');
              else
                obs.next('Success');
            })
        }
      });
    },
    downloadDoc : (id, res) => {
        User.findById(id,(err, data) => {      
          //res.setHeader('Content-Disposition', `attachment; filename=${data.documentName}`);
          res.setHeader('Content-type', `${data.mimetype}`);
          res.send(data.document);
        })
    }
}

module.exports = service;