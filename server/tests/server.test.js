const request = require('supertest');
const expect = require('expect');
const {ObjectID} = require('mongodb');
var {app} = require('../server.js');
const {Todo} = require('../models/Todo.js');
const {User} = require('../models/User.js');
const {seedTodos, seedUsers, todos, users} = require('./seed.js');

beforeEach(seedTodos);
beforeEach(seedUsers);

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

    describe('PATCH /todos/:id',()=>{
        it('should update the todo completed',(done)=>{
            var hexId = todos[0]._id.toHexString();
            var text = '1st todo completed test';
            request(app)
                .patch(`/todos/${hexId}`)
                .send({text , completed: true})
                .expect(200)
                .expect((res)=>{
                    expect(res.body.todo.text).toBe(text);
                    expect(res.body.todo.completed).toBe(true);
                    expect(typeof res.body.todo.completedAt).toBe('number');
                })
                .end(done);
        });

        it('should update the todo uncompleted',(done)=>{
            var hexId = todos[1]._id.toHexString();
            var text = '2nd todo uncompleted test';
            request(app)
                .patch(`/todos/${hexId}`)
                .send({text, completed: false})
                .expect(200)
                .expect((res)=>{
                    expect(res.body.todo.text).toBe(text);
                    expect(res.body.todo.completed).toBe(false);
                    expect(res.body.todo.completedAt).toBeFalsy();
                })
                .end(done); 
        });
    });

    describe('POST /users',()=>{
        it('should save a user',(done)=>{
            request(app)
                .post('/users')
                .send(users[0])
                .expect(200)
                .expect((res)=>{
                    expect(res.body.email).toBe(users[0].email);
                    // expect(res.header('x-auth')).
                })
                .end(done);
        });
        // it('should return user data',(done)=>{});
    });
    
});

