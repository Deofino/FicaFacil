<?php

namespace Controller;

use Helper\Response;
use Model\AssuntoMateriaModel;

class AssuntoMateriaController
{

    public function index($params) // parametros daqui sao da URL
    {
        if ($_SERVER['REQUEST_METHOD'] === 'GET') { // Verifica o metodo
            $model = new AssuntoMateriaModel();
            echo count($params) !== 0 ? $model->get(array('id' => $params[0])) : $model->get(null);
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }

    public function create() // parametro do file_get_contents
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $data = json_decode(file_get_contents('php://input', true));
            $model = new AssuntoMateriaModel();
            if (isset($data->assuntoMateria) && isset($data->materia)) {
                $model->setNome(trim($data->assuntoMateria));
                $model->setMateria($data->materia);
                echo $model->post();
            } else echo Response::warning('Parametro `assuntoMateria` ou `materia` não encontrado ou vazio/nulo', 404);
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }

    public function update() // parametro do file_get_contents
    {
        echo Response::json('JSON update');
    }
    public function delete($params) // parametro url
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $model = new AssuntoMateriaModel();
            echo count($params) !== 0 ? $model->delete($params[0]) : Response::warning('Parametro `id` na url nao encontrado ou nulo', 404);
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }
}
