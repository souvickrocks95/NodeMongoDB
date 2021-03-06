var express = require('express');
var bodyParser = require('body-parser');
const func = require('../middleware/userMiddleware');
var service = require('../service/service');
const auth = require('../middleware/authorization');
const upload = require('../multConfig');
const fs = require('fs');

let router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/', func, function (req, res) {
    var data = req.body;
    service.create(data)
    .subscribe({
        next(user){
            res.status(200).send(user);
        },
        error(err){ 
            res.status(404).send({error : err});
        }
      });
});

router.get('/', function (req, res) {
    service.findAllUser()
    .subscribe({
        next : (data) => res.status(200).send(data),
        error : (err) => res.status(500).send({error : err})
    })
});

router.get('/me', auth, function (req, res) {
    service.getData(req.user)
    .subscribe({
        next : (data) => res.status(200).send(data),
        error : (err) => res.status(500).send({error : err})
    })
});

router.post('/upload', auth, upload.single('avatar'), function (req, res) {
    
    //const file = req.file.buffer;
    const file = req.file;
    service.upload(file, req.user._id)
    .subscribe({
        next : (data) => res.status(200).send(data),
        error : (err) => res.status(500).send({error : err})
    });
});

router.get('/download', function (req, res) {
    const id =  req.query.id;
    service.downloadDoc(id,res);
});


module.exports = router;