// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

var url = 'mongodb://localhost:27017/TodoApp';
MongoClient.connect(url,{ useNewUrlParser: true } , (error, client)=>{
    
    if(error){
        return console.log('Cannot connect to mongodb');
    }
    console.log('Connected to MongoDB server');

    var db = client.db('TodoApp');

    db.collection('todos').find().toArray().then((doc)=>{
        console.log('Todos');
        console.log(JSON.stringify(doc,undefined, 2));
    }, (err)=>{
            console.log('unable to retrieve records', err);
        });
    
    // client.close(()=>{console.log('END');});
}); 