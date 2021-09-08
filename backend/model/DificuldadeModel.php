<?php

namespace Model;

use Helper\Connection;
use Helper\Response;
use PDO;
class DificuldadeModel
{
    private int $id;
    private string $nivel;

    public function getId(): int
    {
        return $this->id;
    }
    public function getNivel(): string
    {
        return $this->nivel;
    }
    public function setNivel(string $nivel): void
    {
        $this->nivel = $nivel;
    }


    public function get($params)
    {
        try {
            $con = Connection::getConn();
            if ($params === null) {
                $stmt = $con->prepare("SELECT * FROM tb_dificuldade");
            } else {
                $stmt = $con->prepare("SELECT * FROM tb_dificuldade WHERE idDificuldade = ?");
                $stmt->bindValue(1, $params['id'], PDO::PARAM_INT);
            }

            if ($stmt->execute()) {
                return Response::success($stmt->fetchAll(\PDO::FETCH_ASSOC));
            }
            return Response::error("Erro ao selecionar dificuldade");
        } catch (\Throwable $th) {
            return Response::error("Error: $th");
        }
    }
    
    public function post($params)
    {
        try {
            $con = Connection::getConn();
            $stmt = $con->prepare("INSERT INTO tb_dificuldade values(null, ?)");
            $stmt->bindValue(1, $params->dificuldade,PDO::PARAM_STR);
            if ($stmt->execute()) {
                return Response::success("Dificuldade inserida com sucesso");
            }
            return Response::error("Erro ao inserir dificuldade");
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
