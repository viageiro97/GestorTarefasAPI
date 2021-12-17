const express = require('express');
const router = express.Router();

const {todasTarefas, criarTarefa, definirEstado, apagarTarefa, apagarTodasTarefas} = require('../controllers/TarefasController');


//@ Rota: /api/v1/tarefas
router.route('/')
.get(todasTarefas)
.post(criarTarefa)

//@ Rota: /api/v1/tarefas/:id
router.route('/:id')
.put(definirEstado)
.delete(apagarTarefa)

//@ Rota: /api/v1/tarefas/remove/all
router.route('/remove/all')
.delete(apagarTodasTarefas)
module.exports = router