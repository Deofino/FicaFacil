<?php

namespace Controller;

use Helper\Response;
use Model\SugestaoVideoModel;

class SugestaoVideoController
{

    public function index($params) // parametros daqui sao da URL
    {
        if ($_SERVER['REQUEST_METHOD'] === 'GET') { // Verifica o metodo
            $model = new SugestaoVideoModel();
            echo count($params) !== 0 ? $model->get(array('id' => $params[0])) : $model->get(null);
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }

    public function create() // parametro do file_get_contents
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $data = json_decode(file_get_contents('php://input', true));
            $model = new SugestaoVideoModel();
            if (isset($data->sugestaoVideo) && isset($data->questao)) {
                $model->setTitulo(trim($data->sugestaoVideo));
                $model->setThumbnailVideo(trim($data->thumbVideo));
                $model->setUrlVideo(trim($data->urlVideo));
                $model->setQuestao($data->questao);
                echo $model->post(null);
            } else echo Response::warning('Parametro não encontrado ou vazio/nulo', 404);
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }

    public function update() // parametro do file_get_contents
    {
        echo Response::json('JSON update');
    }
    public function delete($params) // parametro do file_get_contents
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $model = new SugestaoVideoModel();
            echo count($params) !== 0 ? $model->delete($params[0]) : Response::warning('Parametro `id` na url nao encontrado ou nulo', 404);
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }
}