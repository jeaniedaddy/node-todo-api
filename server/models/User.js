const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');


var UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minLength: 1 ,
        // unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is duplicated'
        }
    },
    password: {
        type: String,
        required: true,
        minLength:6
    },
    tokens:[{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.pre('save',function(next){
    var user = this;
    bcrypt.genSalt(10,(err, salt)=>{
        bcrypt.hash(user.password, salt, (err, hash)=>{
            user.password = hash; 
            next();
        });
    });
});

UserSchema.statics.generateAuthToken = function(user){
    console.log('3',user);
    var screteWord = 'abc123';
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, screteWord);
    user.tokens.push({access, token});
    console.log('4',user);    
    return token; 
    // user.save();
};

UserSchema.statics.findOneByToken = function(token){
    var screteWord = 'abc123';
    var decoded;
    try {
        decoded = jwt.verify(token, screteWord); 
    } catch (e){
        return Promise.reject();
    }
    
    var searchBody = {
        _id: decoded._id , 
        'tokens.access': decoded.access,
        'tokens.token': token
    };
    return User.findOne(searchBody);
};

var User = mongoose.model('User', UserSchema);

module.exports = {User};