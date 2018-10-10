const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/Todo');
const {User} = require('../server/models/User');

const {ObjectID} = require('mongodb');

var did = '5bbce7e10a05933b6263df1d'; 


// Todo.deleteMany({}).then((res)=> {
//     console.log(res);
// });

Todo.findOneAndRemove({_id: did}).then((res)=>{
    console.log(res);
});

Todo.findByIdAndRemove(did).then((res)=>{
    console.log(res);
});