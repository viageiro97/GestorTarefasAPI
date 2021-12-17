const mongoose = require('mongoose');

const tarefaShema = new mongoose.Schema({
    text: {
        type:String,
        trim:true,
        required: [true,"A tarefa tem de conter algum conteúdo!"],
        minlength:[3,'A tarefa tem de conter no minimo 3 caracteres!']
    },
    complete: {
        type:Boolean, 
        required:[true,"Não especificou se a tarefa foi completa ou não"],
    }
},{timestamps:true})

module.exports = mongoose.model('Tarefa', tarefaShema);