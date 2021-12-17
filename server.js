const express = require('express');
const dotenv = require('dotenv').config();
const conectarDB = require('./config/db');
const tarefasRotas = require('./routes/tarefas');
const cors = require('cors');



//Inicializar aplicação
const app = express();

//Conectar a base de dados
conectarDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Aplicação disponível na porta ${PORT}`)
});

//Middlewares e definições
app.use(cors());
app.use(express.json());


//Sistema de rotas
app.use('/api/v1/tarefas', tarefasRotas)