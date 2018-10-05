// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

var url = 'mongodb://localhost:27017/TodoApp';
MongoClient.connect(url,{ useNewUrlParser: true } , (error, client)=>{
    
    if(error){
        return console.log('Cannot connect to mongodb');
    }
    console.log('Connected to MongoDB server');

    var db = client.db('TodoApp');

    db.collection('todos').findOneAndUpdate({
        _id: ObjectID("5bb37c27ba63b03c94edb048")},{
            $set: {completed: false}
        },{
            returnOriginal: false
        }).then((result)=>{
            console.log(result);
    });
    
    db.collection('users').findOneAndUpdate({
        _id: new ObjectID("5bb37c27ba63b03c94edb049")},{
            $set: {
                name: 'jeanie'
            },
            $inc: { age: 1}
        },{
            returnOriginal: false
        }).then((result=>{
        console.log(result);
    }));

    // client.close();
}); 