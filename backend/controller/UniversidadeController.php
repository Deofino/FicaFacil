<?php

namespace Controller;

use Helper\Response;
use Model\UniversidadeModel;

class universidadeController
{

    public function index($params) // parametros daqui sao da URL
    {
        if ($_SERVER['REQUEST_METHOD'] === 'GET' && auth()) { // Verifica o metodo
            $model = new UniversidadeModel();
            $where = '';
            $send = [];
            $inner = '';

            if (isset($_GET['Universidade'])) {
                if ($_GET['Universidade'] > 0) {
                    $where .= ' WHERE idUniversidade = :Universidade AND';
                    $send[':Universidade']
                        = (int) $_GET['Universidade'];
                }
            }

            if (isset($_GET['pesquisa'])) {
                $where .= ' WHERE nomeUniversidade LIKE :pesquisa AND';
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
            // aqui
            echo $model->get('',$where,$send,$inner);
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }
    
    public function update() // parametro do file_get_contents
    {
        if ($_SERVER['REQUEST_METHOD'] === 'PUT'&& auth()) { // verificar se eh post
            $req = json_decode(file_get_contents('php://input')); // pega os dados da requisicao json
            if (isset($req->universidade) && isset($req->id)) { // verifica se o id e a dificuldade existem
                if ($req->id > 0 && $req->id !== null && $req->id > 0) { // verifica se o id pode existir
                    $model = new UniversidadeModel();
                    $data = json_decode($model->get()); // requisicao para verificar se bate com alguma dificuldade existente
                    if ($data->status_code === 200) { // se houver erro na requisicao na dificuldade 
                        foreach ($data->data as $el) { // foreach pra verificar cada elemento
                            if ($el->idUniversidade == $req->id) { // se for igual pode atualizar
                                $model->setNome(trim($req->universidade),false); // insere aqui pra passar pelas verificacoes de dados
                                echo $model->put($req->id);
                                return;
                            };
                        }
                        echo Response::warning("Universidade com id `" .$req->id . "` nao encontrada", 404);
                        return; // senao puder ele ira gerar erro daqui pra baixo
                    } else {
                        echo Response::error("Erro ao pegar universidade", 404);
                        return;
                    };
                }
                echo Response::warning("id da universidade inválida", 400);
                return;
            } else echo Response::warning('Parametro `universidade/id` não encontrado ou vazio/nulo', 404);
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }
    public function delete($params) // parametro do file_get_contents
    {
        if ($_SERVER['REQUEST_METHOD'] === 'DELETE'&& auth()) {
            $model = new UniversidadeModel();
            echo count($params) !== 0 ? $model->delete($params[0]) : Response::warning('Parametro `id` na url nao encontrado ou nulo', 404);
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }
}
