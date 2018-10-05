const express = require('express');
const bodyParser = require('body-parser');
var {mongoose} = require('./db/mongoose'); // this mongoose vs the mongoose in model js files. how are they connected?

const {Todo} = require('./models/Todo');
const {User} = require('./models/User');


var app = express();

// don't the meaning of this
app.use(bodyParser.json());

app.post('/Todos', (req,res)=>{
    var todo = new Todo({text: req.body.text, completed: req.body.completed});
    todo.save().then((doc)=>{
        console.log(doc);
        res.send(doc);
    },(err)=>{
        res.status(400).send('unable to save');
    });
});

app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
});
