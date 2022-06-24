const TaskModel = require('../model/TaskModel');

const TaskValidation = async (req, res, next) => {

    //Define os campos obrigatórios para validação de Task
    const RequiredFields = [
        "macaddress",
        "type",
        "title",
        "description",
        "when"
    ];

    const errors = [];

    //Realiza um mapeamento dos campos obrigatórios checando se os 
    //que são recebidos pela requisição estão de acordo com os obrigatórios
    RequiredFields.map((key) => {
        if (Object.keys(req.body).indexOf(key) < 0) {
            errors.push(`${key} é obrigatório(a)!`);
        }
    });
    
    //Caso haja campos obrigaórios faltando será exibida mensagem de erro
    if (errors.length) {
        return res.status(400).json({error: errors});
    }


    const { macaddress, type, title, description, when } = req.body;    
    
    let exists;

    //Caso tenha o id de parametro irá verificar a existência sem checar o id passado
    if (req.params.id) {
        exists =  await TaskModel.findOne({
                        '_id':  {'$ne': req.params.id},
                        'when': {'$eq': new Date(when)},
                        'macaddress': {'$in': macaddress}
                    });
    } else {
        //Checa a existência de uma tarefa do mesmo MACAddress agendada no mesmo horário
        exists = await TaskModel.findOne({
                        'when': {'$eq': new Date(when)},
                        'macaddress': {'$in': macaddress}
                    });
    }

    if (exists) {
        return res.status(400).json({error: "Já existe uma tarefa nesse dia e horário!"});
    }

    next();
};

module.exports = TaskValidation;