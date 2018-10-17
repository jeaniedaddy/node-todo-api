
require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
var {mongoose} = require('./db/mongoose'); // this mongoose vs the mongoose in model js files. how are they connected?
var {ObjectID} = require('mongodb');
var jwt = require('jsonwebtoken');

const {Todo} = require('./models/Todo');
const {User} = require('./models/User');
const {authenticate} = require('./middleware/authenticate');

const port = process.env.PORT ;

var app = express();

// don't the meaning of this
app.use(bodyParser.json());

app.post('/Todos', (req,res)=>{
    var todo = new Todo({text: req.body.text, completed: req.body.completed});
    //console.log(req.body.text);
    todo.save().then((doc)=>{
        //console.log(doc);
        res.send(doc);
    },(err)=>{
        res.status(400).send(err);
    });
});

app.get('/Todos',(req,res)=>{
    Todo.find().then((todos)=>{
        res.send({todos});
    },(err)=>{
        res.status(400).send(err);
    });
});

app.get('/Todos/:id',(req,res)=>{
    // res.send(req.params);
    
    //check id 404
    if(!ObjectID.isValid(req.params.id)) {
        return res.status(404).send();
    }
   
    Todo.findById(req.params.id).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e)=>{
        console.log('error while find todo by id');
        res.status(400).send();
    });
});

app.delete('/Todos/:id',(req,res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        console.log('not valid id');
        return res.status(404).send();
    }

    Todo.findByIdAndDelete(id).then((todo)=>{
        if(!todo){
            console.log('nothing to delete');
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e)=>{
        console.log('error while deleting')
        res.status(400).send(e);

    });
});

app.patch('/Todos/:id',(req, res)=>{
    var id = req.params.id;
    var body = _.pick(req.body, ["text", "completed"]);

    if( _.isBoolean(body.completed) && body.completed === true){
        body.completed = true; 
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false; 
        body.completedAt = null; 
    }

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    Todo.findByIdAndUpdate(id, 
        {$set: { 
            text: body.text,
            completed: body.completed,
            completedAt: body.completedAt
    }},{new: true})
    .then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    })
    .catch((e)=>{
        res.status(400).send();
    });
});

app.post('/users', (req,res) =>{
    var body = _.pick(req.body,['email','password']);
    var user = new User(body);
    
    // console.log(user);
    user.save().then((user)=>{
        var token = User.generateAuthToken(user)
        user.save().then((user)=>{
            res.header('x-auth',token).send(user);
        });
        
    }).catch((e)=>{
        res.status(401).send(e);
    });

});

app.get('/users/me', authenticate, (req,res)=>{
    res.send(req.user);
});


app.listen(port, ()=>{ 
    console.log(`Server is running at port ${port}`);
}); 

module.exports.app = app; 