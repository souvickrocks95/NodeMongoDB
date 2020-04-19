var express = require('express');
var bodyParser = require('body-parser');
var service = require('../service/taskService');
const auth = require('../middleware/authorization');

var router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/', auth, function (req, res) {
    var data = req.body;
    data.owner = req.user._id;
    service.create(data)
    .subscribe({
        next(data){
            res.status(200).send(data);
        },
        error(err){ 
            res.status(404).send({error : err});
        }
      });
});

router.get('/', auth, function (req, res) {
        service.findAll(req.user)
        .subscribe({
            next(data){
                res.status(200).send(data);
            },
            error(err){ 
                res.status(404).send({error : err});
            }
        })
});

router.get('/:id', auth, function (req, res) {
    service.findTask(req.params.id)
    .subscribe({
        next(data){
            res.status(200).send(data);
        },
        error(err){ 
            res.status(404).send({error : err});
        }
    })
});

module.exports = router;