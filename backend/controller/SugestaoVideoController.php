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
        if ($_SERVER['REQUEST_METHOD'] === 'POST') { // verificar se eh post
            $req = json_decode(file_get_contents('php://input')); // pega os dados da requisicao json
            if (isset($req->titulosugestaoVideo) && isset($req->thumbnailsugestaoVideo) && isset($req->urlsugestaoVideo) && isset($req->id) && isset($req->questao)) { // verifica se o id e a materia existem
                if ($req->id > 0 && $req->id !== null && $req->id > 0) { // verifica se o id pode existir
                    $model = new SugestaoVideoModel();
                    $data = json_decode($model->get()); // requisicao para verificar se bate com alguma materia existente
                    if ($data->status_code === 200) { // se houver erro na requisicao na materia 
                        foreach ($data->data->sugestaoVideo as $el) { // foreach pra verificar cada elemento
                            if ($el->idSugestaoVideo == $req->id) { // se for igual pode atualizar
                                $model->setTitulo(trim($req->titulosugestaoVideo)); // insere aqui pra passar pelas verificacoes de dados
                                $model->setThumbnailVideo(trim($req->thumbnailsugestaoVideo));
                                var_dump($req);
                                $model->setUrlVideo(trim($req->urlsugestaoVideo));
                                $model->setQuestao($req->questao);
                                echo $model->put($req->id);
                                return;
                            };
                        }
                        echo Response::warning("Sugestão Video com id `" . $req->id . "` não encontrada", 404);
                        return; // senao puder ele ira gerar erro daqui pra baixo
                    } else {
                        echo Response::error("Erro ao pegar sugestão video", 404);
                        return;
                    };
                }
                echo Response::warning("id da sugestão video inválida", 400);
                return;
            } else echo Response::warning('Parametro `sugestaoVideo/id` não encontrado ou vazio/nulo', 404);
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
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