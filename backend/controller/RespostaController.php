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

            if (isset($_POST['certaResposta']) && isset($_FILES['alternativas']) && $_POST['questao']) {

                $path = './images/respostas/';
                file_exists($path) or mkdir($path);

                for (
                    $i = 0;
                    $i < count($_FILES['alternativas']['name']);
                    $i++
                ) {
                    $ext = pathinfo($_FILES['alternativas']['name'][$i], PATHINFO_EXTENSION);
                    $name = md5(time() . $_FILES['alternativas']['name'][$i]) . '.' . $ext;
                    $variavel = ($_FILES['alternativas']['tmp_name'][$i]);
                    $url = 'http://' . $_SERVER['HTTP_HOST'] . explode('index.php', $_SERVER['PHP_SELF'])[0] . 'images/respostas/' . $name;

                    $model = new RespostaModel();
                    $model->setCertaResposta(0);

                    if (strtoupper(trim($_FILES['alternativas']['name'][$i])) === strtoupper(trim($_POST['certaResposta']))) {
                        $model->setCertaResposta(1);
                    }

                    $model->setTextoResposta(trim($url));
                    $model->setIdQuestao($_POST['questao']);
                    $model->post();

                    move_uploaded_file($variavel, $path . $name);
                }
                echo Response::success("Respostas cadastradas com sucesso");
                return;
            } else if (isset($data->alternativas) && isset($data->questao) && isset($data->certaResposta)) {
                foreach ($data->alternativas as $al) {
                    $model = new RespostaModel();
                    if (isset($al)) {
                        $model->setCertaResposta(0);
                        if (strtoupper(trim($al)) === strtoupper(trim($data->certaResposta))) {
                            $model->setCertaResposta(1);
                        }
                        $model->setTextoResposta(trim($al));
                        $model->setIdQuestao($data->questao);
                        $model->post();
                    } else {
                        echo Response::warning('Alternativa com valor vazio', 404);
                        return;
                    };
                    echo Response::success("Respostas cadastradas com sucesso");
                    return;
                }
            } else echo Response::warning('Parametro `alternativas/questao/certaResposta` não encontrado ou vazio/nulo', 404);
            return;
            echo Response::warning('Metodo não encontrado', 404);
        }
    }

    public function update() // parametro do file_get_contents
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') { // verificar se eh post
            $req = json_decode(file_get_contents('php://input')); // pega os dados da requisicao json
            if (isset($req->resposta) && isset($req->certaResposta) && isset($req->id) && isset($req->questao)) { // verifica se o id e a materia existem
                if ($req->id > 0 && $req->id !== null && $req->id > 0) { // verifica se o id pode existir
                    $model = new RespostaModel();
                    $data = json_decode($model->get()); // requisicao para verificar se bate com alguma materia existente
                    if ($data->status_code === 200) { // se houver erro na requisicao na materia 
                        foreach ($data->data->resposta as $el) { // foreach pra verificar cada elemento
                            if ($el->idResposta == $req->id) { // se for igual pode atualizar
                                $model->setTextoResposta(trim($req->resposta)); // insere aqui pra passar pelas verificacoes de dados
                                $model->setCertaResposta(trim($req->certaResposta));
                                $model->setIdQuestao($req->questao);
                                echo $model->put($req->id);
                                return;
                            };
                        }
                        echo Response::warning("Resposta com id `" . $req->id . "` não encontrada", 404);
                        return; // senao puder ele ira gerar erro daqui pra baixo
                    } else {
                        echo Response::error("Erro ao pegar resposta", 404);
                        return;
                    };
                }
                echo Response::warning("id da resposta inválida", 400);
                return;
            } else echo Response::warning('Parametro `resposta/id` não encontrado ou vazio/nulo', 404);
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }
    public function delete($params) // parametro do file_get_contents
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $model = new RespostaModel();
            echo count($params) !== 0 ? $model->delete($params[0]) : Response::warning('Parametro `id` na url nao encontrado ou nulo', 404);
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }
}
