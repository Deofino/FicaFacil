<?php

namespace Controller;

use DateTime;
use Helper\Response;
use Model\SimuladoModel;
use Helper\Connection;
use PDO;
use Model\UniversidadeModel;

class SimuladoController
{

    public function index($params) // parametros daqui sao da URL
    {
        if ($_SERVER['REQUEST_METHOD'] === 'GET' && auth()) { // Verifica o metodo

        }
        echo Response::warning('Metodo não encontrado', 404);
    }

    public function create() // parametro do file_get_contents
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && auth()) {
            $data = json_decode(file_get_contents('php://input'));
            foreach ($data->questoes as $item) {
                $model = new SimuladoModel();
                $model->setIdQuestao($item->id);
                $model->setIdUsuario($data->user);
                $model->setHoraInicio($data->comeco);
                $model->setHoraTermino($data->fim);
                $model->setAcertou($item->acertou);

                echo $model->post();
            }
            $con = Connection::getConn();
            $stmt = $con->prepare("UPDATE tb_cliente SET simuladosFeitos = simuladosFeitos + 1 WHERE idCliente = ?");
            $stmt->bindValue(1, ($data->user), PDO::PARAM_INT);
            $stmt->execute();
            // json($item);
            exit;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }

    public function update() // parametro do file_get_contents
    {
        if ($_SERVER['REQUEST_METHOD'] === 'PUT' && auth()) { // verificar se eh post
            $data = json_decode(file_get_contents('php://input'));

            dd($data);
        }
        echo Response::warning('Metodo não encontrado', 404);
    }
    public function delete($params) // parametro do file_get_contents
    {
        if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && auth()) {
        }
        echo Response::warning('Metodo não encontrado', 404);
    }
}
