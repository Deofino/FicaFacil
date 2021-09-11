<?php

namespace Controller;

use Helper\Response;
use Model\RespostaModel;

class RespostaController
{

    public function index($params) // parametros daqui sao da URL
    {
        if ($_SERVER['REQUEST_METHOD'] === 'GET') { // Verifica o metodo
            $model = new RespostaModel();
            echo count($params) !== 0 ? $model->get(array('id' => $params[0])) : $model->get(null);
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }

    public function create() // parametro do file_get_contents
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $data = json_decode(file_get_contents('php://input', true));
            $model = new RespostaModel();
            if (isset($data->resposta) && isset($data->questao)) {
                $model->setTextoResposta(trim($data->textoResposta));
                $model->setCertaResposta(trim($data->certaResposta));
                $model->setIdQuestao($data->questao);
                echo $model->post();
            } else echo Response::warning('Parametro `resposta` ou `questao` não encontrado ou vazio/nulo', 404);
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