<?php

namespace Controller;

use Helper\Response;
use Model\AreaMateriaModel;

class AreaMateriaController
{

    public function index($params) // parametros daqui sao da URL
    {
        if ($_SERVER['REQUEST_METHOD'] === 'GET') { // Verifica o metodo
            $model = new AreaMateriaModel();
            echo count($params) !== 0 ? $model->get(array('id' => $params[0])) : $model->get(null);
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }

    public function create() // parametro do file_get_contents
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $data = json_decode(file_get_contents('php://input'));
            $model = new AreaMateriaModel();
            if (isset($data->areaMateria)) {
                $model->setNome(trim($data->areaMateria)); // insere aqui pra passar pelas verificacoes de dados
                echo $model->post();
            } else echo Response::warning('Parametro `areaMateria` não encontrado ou vazio/nulo', 404);
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }
    
    public function update() // parametro do file_get_contents
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') { // verificar se eh post
            $req = json_decode(file_get_contents('php://input')); // pega os dados da requisicao json
            if (isset($req->areaMateria) && isset($req->id)) { // verifica se o id e a dificuldade existem
                if ($req->id > 0 && $req->id !== null && $req->id > 0) { // verifica se o id pode existir
                    $model = new AreaMateriaModel();
                    $data = json_decode($model->get()); // requisicao para verificar se bate com alguma dificuldade existente
                    if ($data->status_code === 200) { // se houver erro na requisicao na dificuldade 
                        foreach ($data->data as $el) { // foreach pra verificar cada elemento
                            if ($el->idAreaMateria == $req->id) { // se for igual pode atualizar
                                $model->setNome(trim($req->areaMateria)); // insere aqui pra passar pelas verificacoes de dados
                                echo $model->put($req->id);
                                return;
                            };
                        }
                        echo Response::warning("Area Matéria com id `" .$req->id . "` nao encontrada", 404);
                        return; // senao puder ele ira gerar erro daqui pra baixo
                    } else {
                        echo Response::error("Erro ao pegar area matéria", 404);
                        return;
                    };
                }
                echo Response::warning("id da area matéria invalida", 400);
                return;
            } else echo Response::warning('Parametro `areaMateria/id` não encontrado ou vazio/nulo', 404);
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }
    public function delete($params) // parametro do file_get_contents
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $model = new AreaMateriaModel();
            echo count($params) !== 0 ? $model->delete($params[0]) : Response::warning('Parametro `id` na url nao encontrado ou nulo', 404);
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }
}