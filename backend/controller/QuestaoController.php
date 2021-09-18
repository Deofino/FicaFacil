<?php

namespace Controller;

use Helper\Response;
use Model\QuestaoModel;

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
    }
    public function create() // POST INSERIR
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

            // var_dump($_POST);
            // return;
            $model = new QuestaoModel();
            if (
                isset($_POST['titulo']) && isset($_POST['administrador']) && isset($_POST['universidade'])
                && isset($_POST['dificuldade']) && isset($_POST['assuntoMateria'])
            ) {
                $model->setTitulo(trim($_POST['titulo']));
                $model->setTexto(trim($_POST['texto']));
                $model->setImagem(trim($_POST['titulo']));
                $model->setIdAdmistrador($_POST['administrador']);
                $model->setIdUniversidade($_POST['universidade']);
                $model->setIdAssuntoMateria($_POST['assuntoMateria']);
                $model->setIdDificuldade($_POST['dificuldade']);
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
