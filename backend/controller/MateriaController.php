<?php

namespace Controller;

use Helper\Response;
use Model\MateriaModel;

class MateriaController
{

    public function index($params) // parametros daqui sao da URL
    {
        if ($_SERVER['REQUEST_METHOD'] === 'GET' && auth()) { // Verifica o metodo
            $model = new MateriaModel();
            echo count($params) !== 0 ? $model->get(array('id' => $params[0])) : $model->get(null);
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }

    public function create() // parametro do file_get_contents
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && auth()) {
            $data = json_decode(file_get_contents('php://input', true));
            $model = new MateriaModel();
            if (isset($data->materia) && isset($data->area)) {
                $model->setNome(trim($data->materia));
                $model->setArea($data->area);
                echo $model->post();
            } else echo Response::warning('Parametro `materia` ou `area` não encontrado ou vazio/nulo', 404);
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }

    public function update() // parametro do file_get_contents
    {
        if ($_SERVER['REQUEST_METHOD'] === 'PUT' && auth()) { // verificar se eh post
            $req = json_decode(file_get_contents('php://input')); // pega os dados da requisicao json
            if (isset($req->materia) && isset($req->id) && isset($req->area)) { // verifica se o id e a materia existem
                if ($req->id > 0 && $req->id !== null && $req->id > 0) { // verifica se o id pode existir
                    $model = new MateriaModel();
                    $data = json_decode($model->get()); // requisicao para verificar se bate com alguma materia existente
                    if ($data->status_code === 200) { // se houver erro na requisicao na materia 
                        foreach ($data->data->materia as $el) { // foreach pra verificar cada elemento
                            if ($el->idMateria == $req->id) { // se for igual pode atualizar
                                $model->setNome(trim($req->materia), false); // insere aqui pra passar pelas verificacoes de dados
                                $model->setArea($req->area);
                                echo $model->put($req->id);
                                return;
                            };
                        }
                        echo Response::warning("Matéria com id `" . $req->id . "` não encontrada", 404);
                        return; // senao puder ele ira gerar erro daqui pra baixo
                    } else {
                        echo Response::error("Erro ao pegar matéria", 404);
                        return;
                    };
                }
                echo Response::warning("id da materia inválida", 400);
                return;
            } else echo Response::warning('Parametro `materia/id` não encontrado ou vazio/nulo', 404);
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }
    public function delete($params) // parametro do URL
    {
        if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && auth()) {
            $model = new MateriaModel();
            echo count($params) !== 0 ? $model->delete($params[0]) : Response::warning('Parametro `id` na url nao encontrado ou nulo', 404);
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }
}
