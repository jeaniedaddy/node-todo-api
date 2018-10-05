// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

var url = 'mongodb://localhost:27017/TodoApp';
MongoClient.connect(url,{ useNewUrlParser: true } , (error, client)=>{
    
    if(error){
        return console.log('Cannot connect to mongodb');
    }
    console.log('Connected to MongoDB server');

    var db = client.db('TodoApp');

    //deleteMany
    db.collection('users').deleteMany({name: 'mike'}).then((result)=>{
        console.log(result);
    });
    //deleteOne
    // db.collection('todos').deleteOne({text: 'sat'}).then((result)=>{
    //     console.log(result);
    // });

    //findOneAndDelete
    db.collection('users').findOneAndDelete({_id:new ObjectID('5bb37c534b4cd02dccb7e17a')}).then((result)=>{
        console.log(result);
    });
    
    // client.close();
}); 