const taskModel = require('../schema/task');
var {Observable, Subject, of} = require('rxjs');

var service = {
    create : (task) => {
      return  Observable.create(ob => {
        taskModel.create(task, 
        function (err,data) {
            if (err)
                ob.error(err);
            else
                ob.next(data);
            ob.complete();
        });
      });
    },
    findAll : (user) => {
        return Observable.create(ob => {
            taskModel.find({owner : user._id},(err,data) => {
                if(err){
                    ob.error(err);
                }else{
                    ob.next(data);
                }
                ob.complete();
            })
        })
    },
    findTask : (taksId) => {
        return Observable.create(ob => {
            taskModel.findById(taksId,(err,data) => {
                if(err){
                    ob.error(err);
                    ob.complete();
                }else{
                    data.populate('owner').execPopulate()
                    .then((data) => {
                        ob.next(data);
                        ob.complete();
                    })
                    .catch((err) => {
                        ob.error(err);
                        ob.complete();
                    });
                }
            })
        })
    }
}

module.exports = service;