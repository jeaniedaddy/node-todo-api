const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp',(error, client)=>{
    
    if(error){
        return console.log('Cannot connect to mongodb');
    }

    
    const db = client.db('TodoApp');
    db.collection('Todos').insertOne({
        text: 'somthing need to be done',
        completed: false

    },(err,result)=>{
        if(error){
            return console.log('cannot insert todo');
        }

        console.log('inserted', JSON.stringify(result.ops,undefined,2));

    });
    

    db.collection('Users').insertOne({
        name: 'steve',
        age: 46,
        location: 'cherry hill'
    },(err, result)=> {
        if(error){
            return console.log('cannot insert user');
        }

        console.log('a user inserted:', JSON.stringify(result.ops,undefined,2));
    });
    client.close();
});