<?php

namespace Controller;

use Helper\Response;
use Model\QuestaoModel;
use Model\RespostaModel;
use Model\SugestaoVideoModel;

class QuestaoController
{

    public function index($params) // GET-->PEGAR
    {
        if ($_SERVER['REQUEST_METHOD'] === 'GET') { // Verifica o metodo
            $model = new QuestaoModel();
            echo count($params) !== 0 ? $model->get(array('id' => $params[0])) : $model->get(null);
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }
    public function create() // POST INSERIR
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

            // inserir questao
            $namesImages = [];
            if (isset($_FILES['images']) && strlen($_FILES['images']['name'][0]) > 0) {
                for ($i = 0; $i < count($_FILES['images']['name']); $i++) {
                    $ext = pathinfo($_FILES['images']['name'][$i], PATHINFO_EXTENSION);
                    $name = md5(time() . $_FILES['images']['name'][$i]) . '.' . $ext;
                    $variavel = ($_FILES['images']['tmp_name'][$i]);
                    $url = 'http://' . $_SERVER['HTTP_HOST'] . explode('index.php', $_SERVER['PHP_SELF'])[0] . 'images/' . $name;
                    $path = './images/';
                    file_exists($path) or mkdir($path);
                    move_uploaded_file($variavel, $path . $name);
                    array_push($namesImages, $url);
                }
            }
            $namesImages = json_encode($namesImages);
            $model = new QuestaoModel();
            if (isset($_POST['titulo']) && isset($_POST['administrador']) && isset($_POST['universidade']) && isset($_POST['dificuldade']) && isset($_POST['assuntoMateria'])) {
                $model->setTitulo(trim($_POST['titulo']));
                $model->setTexto(trim($_POST['texto']));
                $model->setImagem($namesImages);
                $model->setIdAdmistrador($_POST['administrador']);
                $model->setIdUniversidade($_POST['universidade']);
                $model->setIdAssuntoMateria($_POST['assuntoMateria']);
                $model->setIdDificuldade($_POST['dificuldade']);
                $idInserted = (int)json_decode($model->post())->data[1];

                // resposta
                if (isset($_FILES['alternativas'])) {
                    if ((new RespostaModel)->countRespostas($idInserted) < 5) {
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
                            if (strtoupper(trim($_FILES['alternativas']['name'][$i])) === strtoupper(trim($_POST['correta']))) {
                                $model->setCertaResposta(1);
                            }
                            $model->setTextoResposta(trim($url));
                            $model->setIdQuestao($idInserted);
                            $model->post();
                            move_uploaded_file($variavel, $path . $name);
                        }
                        echo Response::success("Respostas cadastradas com sucesso");
                        return;
                    } else {
                        echo Response::warning('Essa questao ja contem respostas', 400);
                        return;
                    }
                } else if (isset($_POST['alternativas']) && isset($_POST['correta'])) {
                    $alternativas = (explode(',', $_POST['alternativas']));
                    foreach ($alternativas as $al) {
                        $model = new RespostaModel();
                        if ($model->countRespostas($idInserted) < 5) {
                            if (isset($al)) {
                                $model->setCertaResposta(0);
                                if (strtoupper(trim($al)) === strtoupper(trim($_POST['correta']))) {
                                    $model->setCertaResposta(1);
                                }
                                $model->setTextoResposta(trim($al));
                                $model->setIdQuestao($idInserted);
                                $model->post();
                            } else {
                                echo Response::warning('Alternativa com valor vazio', 404);
                                return;
                            };
                        } else {
                            echo Response::warning('Essa questao ja contem respostas', 400);
                            return;
                        };
                    }
                    echo Response::success("Respostas cadastradas com sucesso");
                    return;
                } else {
                    $model->delete($idInserted);
                    echo Response::warning('Alternativas nao encontradas, impossivel cadastrar questao', 404);
                    return;
                }

                // Sugestao
                if (isset($_POST['tituloSugestao']) && isset($_POST['thumbnail']) && isset($_POST['url'])) {
                    $sugestao = new SugestaoVideoModel();
                    $sugestao->setTitulo(trim($_POST['tituloSugestao']));
                    $sugestao->setThumbnailVideo(trim($_POST['thumbnail']));
                    $sugestao->setUrlVideo(trim($_POST['url']));
                    $sugestao->setQuestao($idInserted);
                    $sugestao->post();
                }
            } else echo Response::warning('Parametros não encontrado ou vazio/nulo', 404);
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }
    public function update() // parametro do file_get_contents
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') { // verificar se eh post
            $req = json_decode(file_get_contents('php://input')); // pega os dados da requisicao json
            if (isset($req->tituloQuestao) && isset($req->textoQuestao) && isset($req->universidade)  && isset($req->dificuldade) && isset($req->assuntoMateria) && isset($req->administrador) && isset($req->id)) { // verifica se o id e a materia existem
                if ($req->id > 0 && $req->id !== null && $req->id > 0) { // verifica se o id pode existir
                    $model = new QuestaoModel();
                    $data = json_decode($model->get()); // requisicao para verificar se bate com alguma materia existente
                    if ($data->status_code === 200) { // se houver erro na requisicao na materia 
                        foreach ($data->data->questao as $el) { // foreach pra verificar cada elemento
                            if ($el->idQuestao == $req->id) { // se for igual pode atualizar
                                $model->setTitulo(trim($req->tituloQuestao)); // insere aqui pra passar pelas verificacoes de dados
                                $model->setTexto(trim($req->textoQuestao));
                                var_dump($req);
                                $model->setIdUniversidade($req->universidade);
                                $model->setIdDificuldade($req->dificuldade);
                                $model->setIdAssuntoMateria($req->assuntoMateria);
                                $model->setIdAdmistrador($req->administrador);
                                echo $model->put($req->id);
                                return;
                            };
                        }
                        echo Response::warning("Questão com id `" . $req->id . "` não encontrada", 404);
                        return; // senao puder ele ira gerar erro daqui pra baixo
                    } else {
                        echo Response::error("Erro ao pegar questão", 404);
                        return;
                    };
                }
                echo Response::warning("id da questão inválida", 400);
                return;
            } else echo Response::warning('Parametro `questao/id` não encontrado ou vazio/nulo', 404);
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }
    public function delete($params)
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $model = new QuestaoModel();
            if (count($params) !== 0) {
                $data = json_decode(json_decode($model->get(array('id' => $params[0])))->data->questao[0]->imagensQuestao);
                if (count($data) > 0) {
                    foreach ($data as $photo) {
                        $photo = explode('backend/', $photo);
                        $photo = './' . $photo[1];
                        unlink($photo);
                    }
                }
                echo $model->delete($params[0]);
                return;
            }
            echo Response::warning('Parametro `id` na url nao encontrado ou nulo', 404);
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }
    public function view($params)
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            echo json_encode([$_POST, $_FILES]);
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }
}
