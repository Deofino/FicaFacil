<?php

namespace Controller;

use Helper\Response;
use Model\ClienteModel;
use Helper\JWT;
use Controller\EmailController;
use Exception;

class ClienteController
{

    private $provider = null;
    private $google = null;

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
        if ($this->google == null) {
            $this->google = new \League\OAuth2\Client\Provider\Google([
                'clientId'          => GOOGLE['ID'],
                'clientSecret'      => GOOGLE['SECRET'],
                'redirectUri'       => GOOGLE['REDIRECT'],
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
                $model->setEmail(trim($data->email), true);
                $model->setSenha(trim(password_hash($data->senha, PASSWORD_DEFAULT))); // insere aqui pra passar pelas verificacoes 
                $model->setFoto('');
                echo $model->post();
            } else echo Response::warning('Parametro `email/nome/senha` não encontrado ou vazio/nulo', 404);
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }

    public function update() // parametro do file_get_contents
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && auth()) { // verificar se eh post
            if (isset($_POST['id'])) {
                // base
                $model = new ClienteModel();
                $user = json_decode($model->get(['id' => $_POST['id']]))->data[0];
                // dd($_POST);
                $model->setNome($user->nomeCompletoCliente);
                $model->setSenha($user->senhaCliente);
                $model->setDataAniversario($user->dataAniversarioCliente);
                $model->setEmail($user->emailCliente, false);
                $model->setFoto($user->fotoCliente);
                // pra cada campo que querer
                if (isset($_FILES['imagem']) && isset($_POST['id'])) {
                    if ($user->fotoCliente !== '') {
                        $photo = $user->fotoCliente;
                        $photo = explode('backend/', $photo);
                        $photo = './' . $photo[1];
                        unlink($photo);
                    }
                    $imagem = $_FILES['imagem'];

                    $ext = pathinfo($imagem['name'], PATHINFO_EXTENSION);
                    $name = md5(time() . $imagem['name']) . '.' . $ext;
                    $variavel = ($imagem['tmp_name']);
                    $url = 'http://' . $_SERVER['HTTP_HOST'] . explode('index.php', $_SERVER['PHP_SELF'])[0] . 'images/users/' . $name;
                    $path = './images/users/';
                    file_exists($path) or mkdir($path);
                    move_uploaded_file($variavel, $path . $name);

                    $model->setFoto($url);
                }
                if (isset($_POST['nome']) && isset($_POST['id'])) {
                    $model->setNome(trim($_POST['nome']));
                }
                if (isset($_POST['email']) && isset($_POST['id'])) {
                    $model->setEmail(trim($_POST['email']));
                }
                if (isset($_POST['datanasc']) && isset($_POST['id'])) {
                    $model->setDataAniversario(trim($_POST['datanasc']));
                }
                if (isset($_POST['senha']) && isset($_POST['old_senha']) && isset($_POST['id'])) {
                    //veriricar se bate
                    // dd($user);
                    if (password_verify($_POST['old_senha'], $user->senhaCliente)) {
                        // dd('passou');
                        $model->setSenha(password_hash(trim($_POST['senha']), PASSWORD_DEFAULT));
                    } else {
                        http_response_code(404);
                        return throw new Exception('Senha antiga invalida', 404);
                    }
                }

                echo $model->put($_POST['id']);
                return;
            }
            echo Response::warning('Parametro `id` não encontrado ou vazio/nulo', 404);
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
        $authUrl = $this->google->getAuthorizationUrl([
            'scope' => ['email'],
        ]);
        echo $authUrl;
    }
    public function loginGoogle()
    {
        if (isset($_GET['code'])) {
            $token = $this->google->getAccessToken('authorization_code', [
                'code' => $_GET['code']
            ]);
            /* 
            @var $user League\OAuth2\Client\Provider\GoogleUser
                */
            $user = ($this->google->getResourceOwner($token));
            // dd($user);
            $model = new ClienteModel();
            if (json_decode($model->get(['email' => $user->getEmail()]))->status_code === 200) {
                $req = json_decode($model->get(['email' => $user->getEmail()]));
                $data = [
                    'id' => $req->data[0]->idCliente,
                    'nome' => $req->data[0]->nomeCompletoCliente,
                    'email' => $req->data[0]->emailCliente,
                    'foto' => $user->getAvatar(),
                    'facebook' => true,
                ];
            } else {
                $model->setNome(trim($user->getFirstName() . " " . $user->getLastName()));
                $model->setEmail(trim($user->getEmail()), true);
                $model->setSenha(trim(password_hash($token,  PASSWORD_DEFAULT)));
                $model->setFoto(trim($user->getAvatar()));
                $model->post();
                $data = [
                    'id' => json_decode($model->get(['email' => $user->getEmail()]))->data[0]->idCliente,
                    'nome' => $user->getFirstName() . " " . $user->getLastName(),
                    'email' => $user->getEmail(),
                    'foto' => $user->getAvatar(),
                    'facebook' => true,
                ];
            };

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
            $model = new ClienteModel();
            $req = json_decode($model->get(['email' => $user->getEmail()]));
            if ($req->status_code == 200) {
                // dd($req);
                $data = [
                    'id' => $req->data[0]->idCliente,
                    'nome' => $req->data[0]->nomeCompletoCliente,
                    'email' => $req->data[0]->emailCliente,
                    'foto' => $user->getPictureUrl(),
                    'facebook' => true,
                ];
            } else {
                $model->setNome(trim($user->getFirstName() . " " . $user->getLastName()));
                $model->setEmail(trim($user->getEmail()));
                $model->setSenha(trim(password_hash($token,  PASSWORD_DEFAULT)));
                $model->setFoto(trim($user->getPictureUrl()));
                $model->post();
                $data = [
                    'id' => json_decode($model->get(['email' => $user->getEmail()]))->data[0]->idCliente,
                    'nome' => $user->getFirstName() . " " . $user->getLastName(),
                    'email' => $user->getEmail(),
                    'foto' => $user->getPictureUrl(),
                    'facebook' => true,
                ];
            };

            $jwt = JWT::createJWT($data);
            echo Response::success(['token' => $jwt]);
            return;
        }
        echo Response::error('Nao autorizado ou sem parametros...');
    }
    public function logoutFacebook()
    {
        if (isset($_GET['email'])) {
            // echo (new ClienteModel)->delete(['email' => $_GET['email']]);
            return;
        }
    }

    public function resendPassword()
    {
        $data = json_decode(file_get_contents('php://input'));
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($data->email)) {
            $user = json_decode((new ClienteModel)->get(['email' => $data->email]));
            if ($user->status_code === 200) {
                $user = $user->data[0];

                $link = 'https://localhost:3000/user/redefinir?auth=' . md5($user->idCliente);
                $body =
                    "
                <div style='display: block; background: #5770dc22; border-radius: 4px;text-align: center;padding: 8px'>
                    <div style='margin: 0 auto;max-width: 500px;'>
                        <h1>Fica Fácil</h1>
                        <hr style='width: 100%; margin: 0' />
                        <h3>Esqueceu sua senha?</h3>
                        <span style='font-size: 13px'>Está tudo bem " . $user->nomeCompletoCliente . "! A equipe do Fica Fácil ja providênciou para você redefinir ela!</span>
                        <span style='font-size: 14px; margin-top: 8px'>De maneira segura, rápida e inteligente! Apenas clique neste <a href='$link'>link</a> e você será redirecionada para criar uma nova senha.</span>
                    </div>
                    <div style='margin-top: 20px; width: 100%; margin-bottom: 8px'>
                        <span style='font-size: 13px'>
                            Copyright &copy; 2021 Fica Fácil  
                        </span >
                        <span style='font-size: 13px; display:block'>Todos os dirieto reservados.</span>
                    </div>
                </div>
            ";
                echo Response::success((new EmailController)->send(
                    'Esqueci minha senha',
                    $user->emailCliente,
                    $user->nomeCompletoCliente,
                    $body
                ));
                return;
            }
        }
        echo Response::error('Email nao enviado.');
        return;
    }
    public function redefinir()
    {
        $data = json_decode(file_get_contents('php://input'));
        if ($_SERVER['REQUEST_METHOD'] === 'PUT' && isset($data->senha) && isset($data->auth)) {

            $ids = json_decode((new ClienteModel)->getIds());
            if ($ids->status_code === 200) {
                $ids = $ids->data;
                foreach ($ids as $id) {
                    if (md5($id->id) === $data->auth) {
                        echo (new ClienteModel)->attPass(['senha' => password_hash($data->senha, PASSWORD_DEFAULT), 'id' => $id->id]);
                        return;
                    }
                }
                echo Response::warning("Autorizacao negada.", 401);
                return;
            }

            echo Response::error("Ops, ocorreu um erro interno no sistema...");
            return;
        }
        echo Response::error('Metodo nao encontrado ou parametros nulos/vazios.');
        return;
    }
}
