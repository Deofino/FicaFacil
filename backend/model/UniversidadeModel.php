<?php

namespace Model;

use Helper\Connection;
use Helper\Response;

class UniversidadeModel
{

    private int $id;
    private string $nome;

    public function getId(): int
    {
        return $this->id;
    }
    public function getNome(): string
    {
        return $this->nome;
    }
    public function setNivel(string $nomeUniversidade): void
    {
        $this->nivel = $nomeUniversidade;
    }


    public function get($params)
    {
        try {
            $con = Connection::getConn();
            if ($params === null) {
                $stmt = $con->prepare("SELECT * FROM tb_universidade");
            } else {
                $stmt = $con->prepare("SELECT * FROM tb_universidade WHERE idUniversidade = ?");
                $stmt->bindValue(1, $params['id']);
            }

            if ($stmt->execute()) {
                if ($stmt->rowCount() == 0) {
                    return Response::warning("Nenhuma Universidade encontrada...", 404);
                }
                return Response::success($stmt->fetchAll(\PDO::FETCH_ASSOC));
            }
            return Response::error("Erro ao selecionar universidade");
        } catch (\Throwable $th) {
            return Response::error("Error: $th");
        }
    }
    public function post($params)
    {
        try {
            $con = Connection::getConn();
            $stmt = $con->prepare("INSERT INTO tb_universidade values(null, ?)");
            $stmt->bindValue(1, $params->universidade);
            if ($stmt->execute()) {
                return Response::success("Universidade inserida com sucesso");
            }
            return Response::error("Erro ao inserir universidade");
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
