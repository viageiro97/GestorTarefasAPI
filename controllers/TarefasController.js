/*======================================================================
CONTROLADOR DE TAREFAS QUE DEVE PERMITIR:
1. Retornar a lista de todas as tarefas na base de dados
2. Permir a criação de tarefas com validação do campo Texto
3. Permir a actualização do estado da tarefa entre completo e incompleto
4. Permitir a remoção de tarefas na base de dados
|| 2020 © Victor Felizardo Viageiro
======================================================================*/
//Importar modelo de Tarefas
const TarefasModelo = require('../models/Tarefas');

// @1. Retornar lista de todas as tarefas
// Rota: GET /api/v1/tarefas
const todasTarefas = async (req, res) => {
    try {
        const tarefas = await TarefasModelo.find().sort( { createdAt: -1 });
        const numTarefas = tarefas.length;
        res.status(200).json({
            sucess: true,
            count: numTarefas,
            data: tarefas
        });
    } catch (err) {
        res.status(500).json({
            sucess: false,
            message: 'Erro no servidor'
        });
    }

}


// @2. Criar uma tarefa
// Rota: POST /api/v1/tarefas
const criarTarefa = async (req, res) => {
    let {text,complete} = req.body;
    if(!complete){
        complete = false;
    }
    const tarefa = new TarefasModelo({
        text,
        complete,
    });
    try {
        const tarefaSalva = await tarefa.save();
        return res.status(201).json({
            sucess: true,
            data: tarefaSalva
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const mensagens = Object.values(err.errors).map((val) => val.message);
            res.status(400).json({
                sucess: false,
                message: mensagens
            });
        } else {
            return res.status(500).json({
                sucess: false,
                messages: 'Erro no servidor'
            });
        }
    }
}

//@3. Marcar tarefa como completada/incompleta
// Rota: POST /api/v1/tarefas/:id
const definirEstado = async (req, res) => {
    try {
        const tarefa = await TarefasModelo.findById({
            _id: req.params.id
        });
        if (!tarefa) {
            return res.status(400).json({
                sucess: false,
                message: 'Não existe tarefa com id fornecido!'
            });
        }

        const newCompleteStatus = !tarefa.complete;
        const updateTarefa = await TarefasModelo.updateOne({
            _id: req.params.id
        }, {
            complete: newCompleteStatus
        });
        return res.status(200).json({
            sucess: true,
            message: 'Estado da tarefa modificado com sucesso',
            Newcomplete: newCompleteStatus
        });

    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(400)
                .json({
                    sucess: false,
                    message: 'O id inserido não é válido!'
                });
        } else {
            return res.status(500)
                .json({
                    sucess: false,
                    message: 'Erro no servidor'
                });
        }
    }
}

// @4. Apagar Tarefa
// Rota: DELETE /api/v1/tarefas/:id
const apagarTarefa = async (req, res) => {
    try {
        const tarefaApagar = await TarefasModelo.findOneAndDelete({
            _id: req.params.id
        });
        if (!tarefaApagar) {
            return res.status(400)
                .json({
                    sucess: false,
                    message: 'Nenhuma tarefa com o id fornecido!'
                })
        }
        return res.status(200).json({
            sucess: true,
            message: 'Tarefa apagada com sucesso!'
        })
    } catch (err) {
        return res.status(500).json({
            sucess: false,
            message: 'Erro no servidor!'
        })
    }

}


// @1. Apagar Todas as tarefas
// Rota: GET /api/v1/tarefas/remove/all
const apagarTodasTarefas = async (req, res) => {
    try {
        const tarefaApagar = await TarefasModelo.deleteMany({})
        if (tarefaApagar.n===0) {
            return res.status(200)
                .json({
                    sucess: true,
                    message: 'Não haviam tarefas salvas!'
                })
        }
        return res.status(200).json({
            sucess: true,
            message: `Todas ${tarefaApagar.n} tarefas removidas!` 
        })
    } catch (err) {
        return res.status(500).json({
            sucess: false,
            message: 'Erro no servidor! Nenhuma tarefa apagada'
        })
    }

}



module.exports = {
    todasTarefas,
    apagarTodasTarefas,
    criarTarefa,
    apagarTarefa,
    definirEstado
}