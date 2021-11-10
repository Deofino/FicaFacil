<?php

namespace Controller;

use Helper\Response;
use Model\ClienteModel;
use Helper\JWT;

class ClienteController
{

    private $provider = null;

    public function __construct()
    {
        if ($this->provider == null) {
            $this->provider = new \League\OAuth2\Client\Provider\Facebook([
                'clientId'          => FACEBOOK['ID'],
                'clientSecret'      => FACEBOOK['SECRET'],
                'redirectUri'       => FACEBOOK['REDIRECT'],
                'graphApiVersion'   => FACEBOOK['GRAPH'],
            ]);
        }
    }

    public function __constructGoogle()
    {
        if ($this->provider == null) {
            $this->provider = new \League\OAuth2\Client\Provider\Google([
                'clientId'          => GOOGLE['ID'],
                'clientSecret'      => GOOGLE['SECRET'],
                'redirectUri'       => GOOGLE['REDIRECT'],
                'graphApiVersion'   => GOOGLE['GRAPH'],
            ]);
        }
    }

    public function index($params) // parametros daqui sao da URL
    {
        if ($_SERVER['REQUEST_METHOD'] === 'GET') { // Verifica o metodo
            $model = new ClienteModel();
            echo count($params) !== 0 ? $model->get(array('id' => $params[0])) : $model->get(null);
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }

    public function create() // parametro do file_get_contents
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $data = json_decode(file_get_contents('php://input'));
            $model = new ClienteModel();
            if (isset($data->email) && isset($data->nome) && isset($data->senha)) {
                $model->setNome(trim($data->nome));
                $model->setEmail(trim($data->email));
                $model->setSenha(trim(password_hash($data->senha, PASSWORD_DEFAULT))); // insere aqui pra passar pelas verificacoes de dados
                echo $model->post();
            } else echo Response::warning('Parametro `email/nome/senha` não encontrado ou vazio/nulo', 404);
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }

    public function update() // parametro do file_get_contents
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && auth()) { // verificar se eh post
            $req = json_decode(file_get_contents('php://input')); // pega os dados da requisicao json
            if (isset($req->nomeCliente) && isset($req->emailCliente) && isset($req->senhaCliente) && isset($req->id)) { // verifica se o id e a dificuldade existem
                if ($req->id > 0 && $req->id !== null && $req->id > 0) { // verifica se o id pode existir
                    $model = new ClienteModel();
                    $data = json_decode($model->get()); // requisicao para verificar se bate com alguma dificuldade existente
                    if ($data->status_code === 200) { // se houver erro na requisicao na dificuldade 
                        foreach ($data->data as $el) { // foreach pra verificar cada elemento
                            if ($el->idCliente == $req->id) { // se for igual pode atualizar
                                $model->setNome(trim($req->nomeCliente)); // insere aqui pra passar pelas verificacoes de dados
                                $model->setEmail(trim($req->emailCliente));
                                $model->setSenha(trim($req->senhaCliente));
                                echo $model->put($req->id);
                                return;
                            };
                        }
                        echo Response::warning("Cliente com id `" . $req->id . "` não encontrada", 404);
                        return; // senao puder ele ira gerar erro daqui pra baixo
                    } else {
                        echo Response::error("Erro ao pegar Cliente", 404);
                        return;
                    };
                }
                echo Response::warning("id da Cliente invalida", 400);
                return;
            } else echo Response::warning('Parametro `cliente/id` não encontrado ou vazio/nulo', 404);
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }
    public function delete($params) // parametro do file_get_contents
    {
        if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && auth()) {
            $model = new ClienteModel();
            echo count($params) !== 0 ? $model->delete($params[0]) : Response::warning('Parametro `id` na url nao encontrado ou nulo', 404);
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }
    public function login()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $data = json_decode(file_get_contents('php://input'));
            $model = new ClienteModel();
            if (isset($data->email) && isset($data->senha)) {
                $req = json_decode($model->login($data->email, $data->senha));

                if ($req->status_code === 200) {
                    $cliente = (array) json_decode($req->data->cliente);
                    $jwt = JWT::createJWT($cliente);

                    echo Response::success(['token' => $jwt]);
                    return;
                } else {
                    echo Response::error("E-mail ou senha incorretos.", 400);
                    return;
                }
            } else {
                echo Response::warning('Parametro `email/senha` não encontrado ou vazio/nulo', 404);
                return;
            }
        }
        echo Response::warning('Metodo não encontrado', 404);
    }
    public function getFacebookUrl()
    {
        $authUrl = $this->provider->getAuthorizationUrl([
            'scope' => ['email'],
        ]);
        echo $authUrl;
    }
    public function getGoogleUrl()
    {
        $authUrl = $this->provider->getAuthorizationUrl([
            'scope' => ['email'],
        ]);
        echo $authUrl;
    }
    public function loginGoogle()
    {
        if (isset($_GET['code'])) {
            $token = $this->provider->getAccessToken('authorization_code', [
                'code' => $_GET['code']
            ]);
            $user = ($this->provider->getResourceOwner($token));
            $data = [
                'id' => $user->getEmail(),
                'nome' => $user->getFirstName() . " " . $user->getLastName(),
                'email' => $user->getEmail(),
                'foto' => $user->getPictureUrl(),
                'google' => true,
            ];

            $model = new ClienteModel();
            if (isset(json_decode($model->get(['email' => $user->getEmail()]))->data[0]->tem)) {
                $model->delete(['email' => $user->getEmail()]);
            };
            $model->setNome(trim($user->getFirstName() . " " . $user->getLastName()));
            $model->setEmail(trim($user->getEmail()));
            $model->setSenha(trim(password_hash($token,  PASSWORD_DEFAULT)));
            $model->post();

            $jwt = JWT::createJWT($data);
            echo Response::success(['token' => $jwt]);
            return;
        }
        echo Response::error('Nao autorizado ou sem parametros...');
    }
    public function loginFacebook()
    {
        if (isset($_GET['code'])) {
            $token = $this->provider->getAccessToken('authorization_code', [
                'code' => $_GET['code']
            ]);
            $user = ($this->provider->getResourceOwner($token));
            $data = [
                'id' => $user->getEmail(),
                'nome' => $user->getFirstName() . " " . $user->getLastName(),
                'email' => $user->getEmail(),
                'foto' => $user->getPictureUrl(),
                'facebook' => true,
            ];

            $model = new ClienteModel();
            if (isset(json_decode($model->get(['email' => $user->getEmail()]))->data[0]->tem)) {
                $model->delete(['email' => $user->getEmail()]);
            };
            $model->setNome(trim($user->getFirstName() . " " . $user->getLastName()));
            $model->setEmail(trim($user->getEmail()));
            $model->setSenha(trim(password_hash($token,  PASSWORD_DEFAULT)));
            $model->post();

            $jwt = JWT::createJWT($data);
            echo Response::success(['token' => $jwt]);
            return;
        }
        echo Response::error('Nao autorizado ou sem parametros...');
    }
    public function logoutFacebook()
    {
        if (isset($_GET['email'])) {
            echo (new ClienteModel)->delete(['email' => $_GET['email']]);
            return;
        }
    }
    public function logoutGoogle()
    {
        if (isset($_GET['email'])) {
            echo (new ClienteModel)->delete(['email' => $_GET['email']]);
            return;
        }
    }
}
