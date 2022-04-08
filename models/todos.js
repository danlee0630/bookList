const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
    title: String,
    isbn: Number,
    author: String,
    readStatus: String,
    subject: String,
    description: String,
    completed: Boolean

})

module.exports.Todo = mongoose.model('todolist',todoSchema,'todolist')