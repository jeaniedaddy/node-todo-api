const jwt = require('jsonwebtoken');
const _ = require('lodash');
const {User} = require('../models/User');

var authenticate = function(req, res, next){
    var token = req.header('x-auth');
    User.findOneByToken(token)
    .then((user)=>{
        if(!user){
            return Promise.reject();
        }

        req.user = user;
        console.log(user);
        next();
    }).catch((e)=>{
        res.status(401).send();
    });
}

module.exports = {
    authenticate
};