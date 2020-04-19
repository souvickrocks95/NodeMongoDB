const jwt = require('jsonwebtoken');
const model = require('../schema/user');

const auth = function(req, res, next){

    let token =  req.header('token') || null;
    if (token){
        jwt.verify(token, 'SECRET_KEY', (err, decode) => {
            if (err){
                res.status(401).send({error : 'Unauthorized'});
            }else{
                model.findOne({email : decode.email}, (err, data) => {
                    if(err){
                        res.status(401).send({error : 'Data not found'});
                    }else{
                        if (data.token != token){
                            res.status(401).send({error : 'Token not found'});
                        }else{
                            req.user = data;
                            next();
                        }
                    }
                })
            }
        })
    }else{
        res.status(401).send({error : 'Not found'});
    }
}

module.exports = auth;