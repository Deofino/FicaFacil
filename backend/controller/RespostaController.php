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
            
            if (isset($data->alternativas) && isset($data->questao) && isset($data->certaResposta)) {
                foreach ($data->alternativas as $al) {
                    $model = new RespostaModel();
                    if (isset($al)) {
                        $model->setCertaResposta(0);
                        if(strtoupper(trim($al)) === strtoupper(trim($data->certaResposta))){
                            $model->setCertaResposta(1);
                        }
                        $model->setTextoResposta(trim($al));
                        $model->setIdQuestao($data->questao);
                        echo $model->post();
                    }else echo Response::warning('Alternativa com valor vazio', 404);
                }
            } else echo Response::warning('Parametro `alternativas/questao/certaResposta` não encontrado ou vazio/nulo', 404);
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
