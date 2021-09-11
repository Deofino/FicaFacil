<?php

namespace Controller;

use Helper\Response;
use Model\AdministradorModel;

class AdministradorController
{

    public function index($params) // parametros daqui sao da URL
    {
        if ($_SERVER['REQUEST_METHOD'] === 'GET') { // Verifica o metodo
            $model = new AdministradorModel(null, null, null);
            echo count($params) !== 0 ? $model->get(array('id' => $params[0])) : $model->get(null);
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }

    public function create() // parametro do file_get_contents
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $data = json_decode(file_get_contents('php://input'));
            $model = new AdministradorModel(null, null, null);
            if (isset($data->email) && isset($data->nome) && isset($data->senha)) {
                $model->setNome(trim($data->nome));
                $model->setEmail(trim($data->email));
                $model->setSenha(trim($data->senha)); // insere aqui pra passar pelas verificacoes de dados
                echo $model->post();
            } else echo Response::warning('Parametro `email/nome/senha` não encontrado ou vazio/nulo', 404);
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }

    public function update() // parametro do file_get_contents
    {
        echo Response::json('JSON update');
    }
    public function delete() // parametro do file_get_contents
    {
        echo Response::json('JSON delete');
    }
}
