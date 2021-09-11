<?php

namespace Model;

use Model\UserModel;
use Helper\Connection;
use Helper\Response;
use PDO;

class AdministradorModel extends UserModel
{
    public function __construct($nome, $email, $senha)
    {
        parent::__construct($nome, $email, $senha);
    }

    public function get($params=null)
    {
        try {
            $con = Connection::getConn();
            if ($params === null) {
                $stmt = $con->prepare("SELECT * FROM tb_administrador");
            } else {
                $stmt = $con->prepare("SELECT * FROM tb_administrador WHERE idAdministrador = ?");
                $stmt->bindValue(1, $params['id'], PDO::PARAM_INT);
            }

            if ($stmt->execute()) {
                return $stmt->rowCount() == 0 ?
                    Response::warning("Nenhum administrador encontrado...", 404) :
                    Response::success($stmt->fetchAll(\PDO::FETCH_ASSOC));
            }
            return Response::error("Erro ao selecionar administrador");
        } catch (\Throwable $th) {
            return Response::error("Error: $th");
        }
    }
    public function post($params = null)
    {
        try {
            $con = Connection::getConn();
            $stmt = $con->prepare("INSERT INTO tb_materia values(null, ?, ?)");
            $stmt->bindValue(1, trim($this->getNome()), PDO::PARAM_STR);
            $stmt->bindValue(2, trim($this->getEmail()), PDO::PARAM_STR);
            $stmt->bindValue(2, trim($this->getSenha()), PDO::PARAM_STR);
            if ($stmt->execute()) {
                return Response::success("Administrador `{$this->getNome()}` inserido com sucesso, id=" . $con->lastInsertId());
            }
            return Response::error("Erro ao inserir Administrador");
        } catch (\Throwable $th) {
            return Response::error("Error: " . $th->getMessage());
        }
    }
    public function put($params)
    {
    }
    public function delete($params)
    {
    }
}
