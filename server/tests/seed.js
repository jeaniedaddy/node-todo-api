const {ObjectID} = require('mongodb');
const {Todo} = require('../models/Todo.js');
const {User} = require('../models/User.js');

var users = [{
    _id: new ObjectID(),
    email: 'jeaniedaddy@gmail.com',
    password: '123455'
},{
    _id: new ObjectID(),
    email: 'hena@gmail.com',
    password: 'abcdef'
}];

var todos = [{
    _id: new ObjectID(),
    text: 'first thing to do'
},{
    _id: new ObjectID(),
    text: 'secound thing to do',
    completed: true,
    completedAt: 3333
}];

var seedTodos = (done)=>{
    Todo.deleteMany({}).then(()=>{
        return Todo.insertMany(todos);
    }).then(()=>{
        done();
    });
}

var seedUsers= (done)=>{
    User.deleteMany({}).then(()=>{
        return User.insertMany(users);
    }).then(()=>{
        done();
    });
};

module.exports = {
    seedTodos,
    seedUsers,
    todos,
    users
};