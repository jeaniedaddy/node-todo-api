const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (err, client)=>{
    if(err){
        return console.log('unable to connect mongodb');
    }    

    var db = client.db('TodoApp');

    db.collection('todos').insertOne({text: 'something to do3', completed: false},(err, result)=>{
        if(err){
            return console.log('unable to insert document');
        }
        console.log('successfully inserted: ', result.ops);
    });

    db.collection('users').insertOne({
        name: 'steve',
        age: 46,
        location: 'philadelphia'
    },(err, result)=>{
        if(err){
            return console.log('unable to insert document');
        }

        console.log('successfully inserted: ', result.ops);
    });

    client.close();
});

