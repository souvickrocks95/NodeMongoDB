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
    findAll : (user, param, pagination) => {
        return Observable.create(ob => {
        if(param){
            var query = {owner: user._id, completed : param === 'true'};
        }else{
            var query = {owner: user._id};
        }
        let sortCiterial = {createdDate : 'asc', description : 1};
        taskModel.find(query)
        .skip((pagination.pageNo - 1)* pagination.pageSize)
        .limit(pagination.pageSize)
        .sort(sortCiterial)
        .exec((err,data) => {
            if(err){
                ob.error(err);
            }else{
                ob.next(data);
            }
            ob.complete();
        });
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
    },
    completeTask : function(id) {

        return Observable.create(obs => {
            taskModel.findByIdAndUpdate(id, {completed : true}, (err, data)=> {
                if(err){
                    obs.error(err);
                }
                else{
                    obs.next(data);
                }
                obs.complete();
            })
        })
    } 
}

module.exports = service;