<?php

namespace Controller;

use Helper\Response;
use Model\QuestaoModel;

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
            $namesImages = [];
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
                echo $model->post();
            } else echo Response::warning('Parametros não encontrado ou vazio/nulo', 404);
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }
    public function update()
    {
        echo Response::json('JSON update');
    }
    public function delete($params)
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $model = new QuestaoModel();
            echo count($params) !== 0 ? $model->delete($params[0]) : Response::warning('Parametro `id` na url nao encontrado ou nulo', 404);
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }
}
