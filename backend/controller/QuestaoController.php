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
        if ($_SERVER['REQUEST_METHOD'] === 'GET' && auth()) { // Verifica o metodo
            $model = new QuestaoModel();
            $where = '';
            $send = [];
            $inner = '';
            if (isset($_GET['materia'])) {
                if ($_GET['materia'] > 0) {
                    $where .= '  WHERE tb_assunto_materia.idMateria = :materia AND';
                    $send[':materia']
                        = (int) $_GET['materia'];
                    $inner .= 'INNER JOIN tb_assunto_materia on tb_assunto_materia.idAssuntoMateria = tb_questao.idAssuntoMateria INNER JOIN tb_materia on tb_assunto_materia.idMateria = tb_materia.idMateria';
                }
            }
            if (isset($params[0])) {
                $where .= ' WHERE idQuestao = :id AND';
                $send[':id'] = (int) $params[0];
            }

            if (isset($_GET['universidade'])) {
                if ($_GET['universidade'] > 0) {
                    $where .= ' WHERE idUniversidade = :universidade AND';
                    $send[':universidade']
                        = (int) $_GET['universidade'];
                }
            }
            if (isset($_GET['dificuldade'])) {
                if ($_GET['dificuldade'] > 0) {
                    $where .= ' WHERE idDificuldade = :dificuldade AND';
                    $send[':dificuldade']
                        = (int) $_GET['dificuldade'];
                }
            }
            if (isset($_GET['assunto'])) {
                if ($_GET['assunto'] > 0) {
                    if ($inner === '') {
                        $where .= ' WHERE idAssuntoMateria = :assunto AND';
                    } else {
                        $where .= ' WHERE tb_assunto_materia.idAssuntoMateria = :assunto AND';
                    }
                    $send[':assunto']
                        = (int) $_GET['assunto'];
                }
            }
            if (isset($_GET['pesquisa'])) {
                $where .= ' WHERE  tituloQuestao LIKE :pesquisa OR textoQuestao LIKE :pesquisa AND';
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
    public function create() // POST INSERIR
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && auth()) {
            // inserir questao
            // dd($_POST, false);
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
                    } else {
                        echo Response::warning('Essa questao ja contem respostas', 400);
                        return;
                    }
                } else if (isset($_POST['alternativas']) && isset($_POST['correta'])) {
                    $alternativas = json_decode($_POST['alternativas']);
                    // dd($alternativas);
                    foreach ($alternativas as $al) {
                        $model = new RespostaModel();
                        // dd($model->countRespostas($idInserted), false);
                        if ($model->countRespostas($idInserted) < 5) {
                            if (isset($al)) {
                                $model->setCertaResposta(0);
                                if ($al == $_POST['correta']) {
                                    $model->setCertaResposta(1);
                                }
                                $model->setTextoResposta(trim($al));
                                $model->setIdQuestao($idInserted);
                                $model->post();
                            } else {
                                echo Response::warning('Alternativa com valor vazio', 404);
                                exit;
                            };
                        } else {
                            echo Response::warning('Essa questao ja contem respostas', 400);
                            exit;
                        };
                    }
                } else {
                    $model->delete($idInserted);
                    echo Response::warning('Alternativas nao encontradas, impossivel cadastrar questao', 404);
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
                echo Response::success("Questao inserida com sucesso");
            } else echo Response::warning('Parametros não encontrado ou vazio/nulo', 404);
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }
    public function update() // parametro do file_get_contents
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && auth()) { // verificar se eh post
            if (trim($_POST['titulo']) !== '' && trim($_POST['texto']) !== '' && trim($_POST['universidade']) !== ''  && trim($_POST['dificuldade']) !== '' && trim($_POST['assuntoMateria']) !== '' && trim($_POST['administrador']) !== '' && trim($_POST['id']) !== '') { // verifica se o id e a materia existem
                if ($_POST['id'] > 0 && $_POST['id'] !== null && $_POST['id'] > 0) { // verifica se o id pode existir
                    $model = new QuestaoModel();
                    $data = json_decode($model->get()); // requisicao para verificar se bate com alguma materia existente
                    if ($data->status_code === 200) { // se houver erro na requisicao na materia 
                        foreach ($data->data->questao as $el) { // foreach pra verificar cada elemento
                            if ($el->idQuestao == $_POST['id']) { // se for igual pode atualizar
                                // valores padrao
                                $model->setTitulo(trim($_POST['titulo'])); // insere aqui pra passar pelas verificacoes de dados
                                $model->setTexto(trim($_POST['texto']));
                                $model->setIdUniversidade($_POST['universidade']);
                                $model->setIdDificuldade($_POST['dificuldade']);
                                $model->setIdAssuntoMateria($_POST['assuntoMateria']);
                                $model->setIdAdmistrador($_POST['administrador']);


                                // imagem da questao
                                $namesImages = json_decode($el->imagensQuestao);
                                if ($_FILES['imagesUpdate']['name'][0] !== '') { // tem imagens novas
                                    if (count(json_decode($el->imagensQuestao)) > 0) { // se ja existe alguma imagem cadastrada na questao
                                        foreach (json_decode($el->imagensQuestao) as $photo) {
                                            $photo = explode(
                                                'backend/',
                                                $photo
                                            );
                                            $photo = './' . $photo[1];
                                            unlink($photo);
                                            array_pop($namesImages);
                                        }
                                    }
                                    for (
                                        $i = 0;
                                        $i < count($_FILES['imagesUpdate']['name']);
                                        $i++
                                    ) {
                                        $ext = pathinfo($_FILES['imagesUpdate']['name'][$i], PATHINFO_EXTENSION);
                                        $name = md5(time() . $_FILES['imagesUpdate']['name'][$i]) . '.' . $ext;
                                        $variavel = ($_FILES['imagesUpdate']['tmp_name'][$i]);
                                        $url = 'http://' . $_SERVER['HTTP_HOST'] . explode('index.php', $_SERVER['PHP_SELF'])[0] . 'images/' . $name;
                                        $path = './images/';
                                        file_exists($path) or mkdir($path);
                                        move_uploaded_file($variavel, $path . $name);
                                        array_push($namesImages, $url);
                                    }
                                }
                                $namesImages = json_encode($namesImages);
                                $model->setImagem($namesImages);

                                //sugestao
                                if (
                                    trim($_POST['tituloSugestao']) !== '' && trim($_POST['thumb']) !== '' && trim($_POST['url']) !== ''
                                ) {
                                    $sugestao = new SugestaoVideoModel();
                                    $sugestao->setTitulo(trim($_POST['tituloSugestao']));
                                    $sugestao->setThumbnailVideo(trim($_POST['thumb']));
                                    $sugestao->setUrlVideo(trim($_POST['url']));
                                    $sugestao->setQuestao($_POST['id']);
                                    $idSugestao = json_decode($sugestao->get(['id' => $_POST['id']]))->data;
                                    if (isset($idSugestao->sugestaoVideo)) {
                                        $idSugestao = (int)$idSugestao->sugestaoVideo[0]->idSugestaoVideo;
                                        $sugestao->put($idSugestao);
                                    } else {
                                        $sugestao->post();
                                    }
                                }
                                // alternativas
                                if (isset($_FILES['alternativas'])) {
                                    // alternativas com imagem
                                    if ($_FILES['alternativas']['name'][0] !== '') {
                                        $path = './images/respostas/';
                                        file_exists($path) or mkdir($path);
                                        $datas_to_delete = json_decode((new RespostaModel())->get(['id' => $_POST['id']]))->data->resposta;
                                        for ($i = 0; $i < count($_FILES['alternativas']['name']); $i++) {
                                            $respostaModel = new RespostaModel();

                                            $photo_to_delete = explode('backend/', $datas_to_delete[$i]->textoResposta);
                                            $photo_to_delete = './' . $photo_to_delete[1];
                                            unlink($photo_to_delete);

                                            $ext = pathinfo($_FILES['alternativas']['name'][$i], PATHINFO_EXTENSION);
                                            $name = md5(time() . $_FILES['alternativas']['name'][$i]) . '.' . $ext;
                                            $variavel = ($_FILES['alternativas']['tmp_name'][$i]);
                                            $url = 'http://' . $_SERVER['HTTP_HOST'] . explode('index.php', $_SERVER['PHP_SELF'])[0] . 'images/respostas/' . $name;
                                            $respostaModel->setCertaResposta(0);
                                            if (strtoupper(trim($_FILES['alternativas']['name'][$i])) === strtoupper(trim($_POST['correta']))) {
                                                $respostaModel->setCertaResposta(1);
                                            }
                                            $respostaModel->setTextoResposta(trim($url));
                                            $respostaModel->setIdQuestao($_POST['id']);
                                            $respostaModel->put((int) json_decode($_POST['alternativas-id'])[$i]);
                                            move_uploaded_file($variavel, $path . $name);
                                        }
                                    } else {
                                        // caso so queria mudar a alternativa
                                        echo (new RespostaModel())->changeCorrect($_POST['id'], $_POST['correta']);
                                    }
                                } else {
                                    //alternativas com texto
                                    $alternativas =  json_decode($_POST['alternativas']);
                                    foreach ($alternativas as $val) {
                                        $respostaModel = new RespostaModel();
                                        $respostaModel->setTextoResposta($val->value);
                                        $respostaModel->setIdQuestao($_POST['id']);
                                        $respostaModel->setCertaResposta(0);
                                        if ($val->item == $_POST['correta']) {
                                            $respostaModel->setCertaResposta(1);
                                        };
                                        $respostaModel->put($val->id);
                                    }
                                }
                                echo $model->put($_POST['id']);
                                return;
                            };
                        }
                        echo Response::warning("Questão com id `" . $_POST['id'] . "` não encontrada", 404);
                        return; // senao puder ele ira gerar erro daqui pra baixo
                    } else {
                        echo Response::error("Erro ao pegar questão", 404);
                        return;
                    };
                }
                echo Response::warning("id da questão inválida", 400);
                return;
            } else echo Response::warning('Parametros não encontrado ou vazio/nulo', 404);
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }
    public function delete($params)
    {
        if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && auth()) {
            $model = new QuestaoModel();
            if (count($params) !== 0) {
                // dd(json_decode($model->get('', array('id' => $params[0]))));
                $data = json_decode(json_decode($model->get('', array('id' => $params[0])))->data->questao[0]->imagensQuestao);
                // dd($data);
                if (count($data) > 0) {
                    foreach ($data as $photo) {
                        $photo = explode('backend/', $photo);
                        $photo = './' . $photo[1];
                        unlink($photo);
                    }
                }
                $resposta = new RespostaModel();
                $res =  json_decode($resposta->get(array('id' => $params[0])))->data->resposta;
                foreach ($res as $alternativa) {
                    $texto = $alternativa->textoResposta;
                    $extention = (pathinfo($texto, PATHINFO_EXTENSION));
                    if (isset($extention) && strlen($extention) !== 0) {
                        $photo = explode('backend/', $texto);
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
}
