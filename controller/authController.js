var express = require('express');
var bodyParser = require('body-parser');
const func = require('../middleware/userMiddleware');
var service = require('../service/service');
const auth =require('../middleware/authorization');

var router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/login', func, function (req, res) {
    var data = req.body;
    service.findByCredential(data.email,data.password)
    .subscribe({
        next(user){
            user.generateToken();
            res.setHeader('token', user.token);
            res.status(200).send(user);
        },
        error(err){ 
            res.status(404).send({error : 'Not Found!!'});
        }
      });
});

router.get('/logout', auth, function(req, res) {
    service.clearToken(req.user)
    .subscribe({
        next : (data) => res.status(200).send(data),
        error : (err) => res.status(501).send({error : err})
    })
});

module.exports = router;