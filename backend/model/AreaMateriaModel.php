<?php

namespace Model;
use Helper\Connection;
use Helper\Response;

class AreaMateriaModel
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
    public function setNome(string $nomeAreaMateria): void
    {
        $this->nome = $nomeAreaMateria;
    }


    public function get($params)
    {
        try {
            $con = Connection::getConn();
            if ($params === null) {
                $stmt = $con->prepare("SELECT * FROM tb_area_materia");
            } else {
                $stmt = $con->prepare("SELECT * FROM tb_area_materia WHERE idAreaMateria = ?");
                $stmt->bindValue(1, $params['id']);
            }

            if ($stmt->execute()) {
                if ($stmt->rowCount() == 0) {
                    return Response::warning("Nenhuma Area da Materia encontrada...", 404);
                }
                return Response::success($stmt->fetchAll(\PDO::FETCH_ASSOC));
            }
            return Response::error("Erro ao selecionar area da materia");
        } catch (\Throwable $th) {
            return Response::error("Error: $th");
        }
    }
    public function post($params)
    {
        try {
            $con = Connection::getConn();
            $stmt = $con->prepare("INSERT INTO tb_area_materia values(null, ?)");
            $stmt->bindValue(1, $params->areamateria);
            if ($stmt->execute()) {
                return Response::success("Area Materia da inserida com sucesso");
            }
            return Response::error("Erro ao inserir area da materia");
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
