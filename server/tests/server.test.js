const request = require('supertest');
const expect = require('expect');
var {app} = require('../server.js');
const {Todo} = require('../models/Todo.js');


var todos = [{
    text: 'first thing to do'
},{
    text: 'secound thing to do'
}];

beforeEach((done)=>{
    Todo.remove({}).then(()=> {
        return Todo.insertMany(todos);
    }).then(()=>{
        done();
    });
});

describe('Todo App test', ()=>{
    it('should be saving a todo',(done)=>{
        request(app).post('/Todos')
        .send({text: 'post test', completed: false})
        .expect(200)
        .expect( response =>{
            expect(response.body.text)
            .toBe( 'post test');
        })
        .end((err, res)=>{
            if(err) {
                return done(err);
            }

            Todo.find({text: 'post test'}).then((todos)=>{
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe('post test');
                done();
            })
            .catch((e)=>{
                done(e);
            });
        });
    });

    it('should not create todo with invalid body data',(done)=>{
        request(app).post('/Todos')
        .send({})
        .expect(400)
        .end((err,res)=>{
            if(err){
                return done(err);
            }

            Todo.find().then((todos)=>{
                expect(todos.length).toBe(2); 
                done();
            })
            .catch((e)=>{
                done(e);
            });
        });
    });

    it('GET /todos', (done)=>{
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res)=>{
                return expect(res.body.todos.length).toBe(3);
            })
            .end(done);
    });
});

describe('test',()=>{});
