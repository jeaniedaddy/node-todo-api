const express = require('express');
const bodyParser = require('body-parser');
var {mongoose} = require('./db/mongoose'); // this mongoose vs the mongoose in model js files. how are they connected?
var {ObjectID} = require('mongodb');

const {Todo} = require('./models/Todo');
const {User} = require('./models/User');

const port = process.env.PORT || 3000;

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
        res.status(404).send();
    }
   
    Todo.findById(req.params.id).then((todo)=>{
        if(!todo){
            res.status(404).send();
        }
        res.status(200).send({todo});
    }).catch((e)=>{
        res.status(404).send();
    });
        
});

app.listen(port, ()=>{ 
    console.log(`Server is running at port ${port}`);
}); 

module.exports.app = app; 