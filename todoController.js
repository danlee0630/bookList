const createError = require('http-errors');
const { ObjectId } = require('mongodb');
const {Todo} = require('./models/todos.js')

exports.index = async function (req,res) {
    Todo.find()
     .then( (todos) => res.send(todos))
}

exports.show = function(req,res,next){
    Todo.findOne({ _id: ObjectId(req.params.id)})
    .then((todoitem) => {
        if(!todoitem){
            return (next(createError("no Books with that id")))
        }
        res.send(todoitem);
    })

}

exports.delete = function(req,res,next){

    
        Todo.deleteOne({_id: ObjectId(req.params.id)})
        .then( (result) => {
            if(result.deletedCount){
                res.send({result:true});
            }
            else {
                return(next(createError(404,"no Books with that id")))
            }
                       
            })	
 
}

exports.update = function(req,res,next){
    if(!req.body.name){
        return (next(createError(400,"no Books with that id")));
    }

    Todo.findOne({_id: ObjectId(req.params.id)})
    .then( (todo) => {
        if(!todo){
            return (next(createError(404,"no Books with that id")))
        }
        todo.title = req.body.title,
        todo.isbn = req.body.isbn,
        todo.author = req.body.author,
        todo.readStatus = req.body.readStatus,
        todo.subject = req.body.subject,
        todo.description = req.body.description,
        todo.completed = req.body.completed

        todo.save()
            .then( () => res.send({result: true}))
    })

}

exports.create = function (req,res,next){

    if(!req.body.title){
        return (next(createError(400,"Book Title is required")));
    }

    const todo = new Todo({
        title: req.body.title,
        isbn: req.body.isbn,
        author: req.body.author,
        readStatus: req.body.readStatus,
        subject: req.body.subject,
        description: req.body.description,
        completed: req.body.completed
    })

    todo.save()
        .then( () => res.send({result:true}))
    
	;
}