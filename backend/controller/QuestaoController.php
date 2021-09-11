<?php

namespace Controller;

use Helper\Response;
use Model\QuestaoModel;
use Model\AdministradorModel;
use Model\AssuntoMateriaModel;
use Model\UniversidadeModel;


class QuestaoController
{

    public function index($params) // GET-->PEGAR
    {
        if ($_SERVER['REQUEST_METHOD'] === 'GET') { // Verifica o metodo
            $model = new QuestaoModel();
            echo count($params) !== 0 ? $model->get(array('id' => $params[0])) : $model->get(null);
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
        /* var_dump($_FILES['images']);
        
        var_dump($_POST); */
    }
    public function create() // POST INSERIR
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $data = json_decode(file_get_contents('php://input', true));
            $model = new QuestaoModel();
            if (isset($data->questao) && isset($data->administrador) && isset($data->universidade)
             && isset($data->dificuldade) && isset($data->assuntoMateria)) {
                $model->setTitulo(trim($data->questao));
                $model->setTitulo(trim($data->questao));
                $model->setImagem(trim($data->questao));
                $model->setIdAdmistrador($data->administrador);
                $model->setIdUniversidade($data->universidade);
                $model->setIdAssuntoMateria($data->assuntoMateria);
                $model->setIdDificuldade($data->dificuldade);
                echo $model->post();
            } else echo Response::warning('Parametros não encontrado ou vazio/nulo', 404);
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }
    public function update()
    {
        echo Response::json('JSON update');
    }
    public function delete()
    {
        echo Response::json('JSON delete');
    }
}
