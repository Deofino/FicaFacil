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
            $where = '';
            $send = [];
            $inner = '';
            if (isset($_GET['materia'])) {
                if ($_GET['materia'] > 0) {
                    $where .= '  WHERE tb_area_materia.idMateria = :materia AND';
                    $send[':materia']
                        = (int) $_GET['materia'];
                    $inner .= 'INNER JOIN tb_area_materia on tb_area_materia.idAreaMateria = tb_materia.idAssuntoMateria INNER JOIN tb_materia on tb_area_materia.idMateria = tb_materia.idMateria';
                }
            }
            if (isset($params[0])) {
                $where .= ' WHERE idMateria = :id AND';
                $send[':id'] = (int) $params[0];
            }

            if (isset($_GET['pesquisa'])) {
                $where .= ' WHERE nomeMateria LIKE :pesquisa AND';
                $send[':pesquisa'] = "%" . $_GET['pesquisa'] . "%";
            }
            $pos = (strpos($where, 'WHERE'));
            $str_before = substr($where, 0, $pos + 6);
            $str_after = str_replace('WHERE', '', substr($where, $pos, strlen($where)));
            $where = $str_before . $str_after;
            if (substr($where, strlen($where) - 4, strlen($where)) == ' AND') {
                $where =  substr($where, 0, strlen($where) - 4);
            };
            if (isset($_GET['random'])) {
                $where .= ' ORDER BY RAND() ';
            }
            if (isset($_GET['limit'])) {
                $where .= ' LIMIT ' . $_GET['limit'];
            }
            echo $model->get($where, $send, $inner);
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
