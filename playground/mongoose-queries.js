const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/Todo');
const {User} = require('../server/models/User');

const {ObjectID} = require('mongodb');

var uid = '5bbcb8e71691844e04d1de50'; 

// User.insertMany([{email: 'jeaniedaddy@gmail.com'},{email: 'noikhyun@gmail.com'}]);

User.find({_id: uid}).then((users)=>{
    if(users.length === 0 ){ 
        return console.log('no records');
    }
    console.log('-Users');
    console.log(users);
}).catch((e)=>{
    console.log('-Users');
    console.log('error: id is wrong');
});

User.findOne({_id: uid}).then((user)=>{
    if(!user){ 
        return console.log('no records');
    }
    console.log('-User');
    console.log(user);
}).catch((e)=>{
    console.log('-User');
    console.log('error: id is wrong');
});

User.findById(uid).then((user)=>{
    if(!user){ 
        return console.log('no records');
    }
    console.log('-User by ID');
    console.log(JSON.stringify(user,undefined, 2));
},(e)=>{
    console.log('-User by ID');
    console.log('Error happened');
});




/*
var id = '5bbbc1ea46ff1a38803e12ab';
if(!ObjectID.isValid(id)){
    console.log('ID is not valid');
} else {
    Todo.find({_id: id}).then((todos)=>{
        console.log('-Todos');
        if( todos.length === 0) { return console.log('unable to find')}
        console.log(todos);
    }).catch((e)=>{
        console.log('-Todos');
        console.log('error happened');
    });
    
    Todo.findOne({_id: id}).then((todo)=>{
        console.log('-Todo');
        if(!todo) { return console.log('unable to find')}
        console.log(todo);
    }).catch((e)=>{
        console.log('-Todo');
        console.log('error happened');
    });
    
    Todo.findById(id).then((todo)=>{
        console.log('-Todo by ID');
        if(!todo) { return console.log('unable to find')}
        console.log(todo)
    
    }).catch((e)=>{
        console.log('-Todo by ID');
        console.log('error happened');
    });
}
*/
