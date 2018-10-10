const request = require('supertest');
const expect = require('expect');
const {ObjectID} = require('mongodb');
var {app} = require('../server.js');
const {Todo} = require('../models/Todo.js');


var todos = [{
    _id: new ObjectID(),
    text: 'first thing to do'
},{
    _id: new ObjectID(),
    text: 'secound thing to do'
}];

beforeEach((done)=>{
    Todo.deleteMany({}).then(()=> {
        return Todo.insertMany(todos);
    }).then(()=>{
        done();
    });
});

describe('Todo App', ()=>{
    describe('POST /todos',()=>{
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
    });
    

    describe('GET /todos',()=>{
        it('should get all todos', (done)=>{
            request(app)
                .get('/todos')
                .expect(200)
                .expect((res)=>{
                    return expect(res.body.todos.length).toBe(2);
                })
                .end(done);
        });
    });

    describe('GET /todos/:id',()=>{
        it('should return 404 for invalid(non-object) _id',(done)=>{
            request(app)
                .get('/todo/123')
                .expect(404)
                // .expect((res)=>{
                //     expect(res.body).toBeNull();
                // })
                .end(done);
        });
        it('should return 200 with object include todo',(done)=>{
            request(app)
                .get(`/todos/${todos[0]._id.toHexString()}`)
                .expect(200)
                .expect((res)=>{
                    expect(res.body.todo.text).toBe('first thing to do');
                })
                .end(done);
        });
        it('should return 404 with nothing if not found',(done)=>{
            var hexId = new ObjectID().toHexString();
            request(app)
                .get(`/todo/${hexId}`)
                .expect(404)
                .end(done);
        }); 
    });

    describe('DELETE /todos/:id',()=>{
        it('should return 404 for invalid(non-object) _id',(done)=>{
            request(app)
                .delete('/todo/123')
                .expect(404)
                // .expect((res)=>{
                //     expect(res.body).toBeNull();
                // })
                .end(done);
        });
        it('should return 200 with object deleted',(done)=>{
            request(app)
                .delete(`/todos/${todos[0]._id.toHexString()}`)
                .expect(200)
                .expect((res)=>{
                    expect(res.body.todo.text).toBe('first thing to do');
                })
                .end((err,res)=>{
                    if(err){
                        return done(err);
                    }

                    Todo.findById(todos[0]._id.toHexString())
                    .then((todo)=>{
                        expect(todo).toBeFalsy();//toNotExist;
                        done();
                    })
                    .catch((e)=>{
                        done(e);
                    });
                });
        });
        it('should return 404 with nothing if not found',(done)=>{
            var hexId = new ObjectID().toHexString();
            request(app)
                .delete(`/todo/${hexId}`)
                .expect(404)
                .end(done);
        }); 
    });
    
});

