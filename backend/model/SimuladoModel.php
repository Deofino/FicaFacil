<?php

namespace Model;

use Helper\Connection;
use Helper\Response;
use PDO;

class SimuladoModel
{

    private int $acertou;
    private string $horaInicio;
    private string $horaTermino;
    private int $idUsuario;
    private int $idQuestao;

    public function getAcertou(): int
    {
        return $this->acertou;
    }
    public function getHoraInicio(): string
    {
        return $this->horaInicio;
    }
    public function getHoraTermino(): string
    {
        return $this->horaTermino;
    }
    public function setHoraInicio(string $horaInicioSimulado): void
    {
        $this->horaInicio = $horaInicioSimulado;
    }
    public function setHoraTermino(string $horaTerminoSimulado): void
    {
        $this->horaTermino = $horaTerminoSimulado;
    }
    public function setAcertou(int $acertou): void
    {
        $this->acertou = $acertou;
    }
    public function getIdUsuario(): int
    {
        return $this->idUsuario;
    }
    public function getIdQuestao(): int
    {
        return $this->idQuestao;
    }
    public function setIdUsuario(int $id): void
    {
        $this->idUsuario = $id;
    }
    public function setIdQuestao(int $id): void
    {
        $this->idQuestao = $id;
    }


    public function get($params = null)
    {
        try {
            $con = Connection::getConn();
            if ($params === null) {
                $stmt = $con->prepare("SELECT * FROM tb_simulado order by idSimulado");
            } else {
                $stmt = $con->prepare("SELECT * FROM tb_simulado WHERE idQuestao = ?  order by idSimulado");
                $stmt->bindValue(1, $params['id'], PDO::PARAM_INT);
            }
            if ($stmt->execute()) {
                return $stmt->rowCount() == 0 ?
                    Response::warning("Nenhum simulado encontrado...", 404) :
                    Response::success($stmt->fetchAll(\PDO::FETCH_ASSOC));
            }
            return Response::error("Erro ao selecionar simulados");
        } catch (\Throwable $th) {
            return Response::error("Error: $th");
        }
    }
    public function post()
    {
        try {
            $con = Connection::getConn();
            $stmt = $con->prepare("INSERT INTO tb_simulado values(null, ?, ?, ?, ?, ?)");
            $stmt->bindValue(1, trim($this->getHoraInicio()), PDO::PARAM_STR);
            $stmt->bindValue(2, trim($this->getHoraTermino()), PDO::PARAM_STR);
            $stmt->bindValue(3, trim($this->getIdUsuario()), PDO::PARAM_INT);
            $stmt->bindValue(4, trim($this->getIdQuestao()), PDO::PARAM_INT);
            $stmt->bindValue(5, trim($this->getAcertou()), PDO::PARAM_INT);
            if ($stmt->execute()) {
                return Response::success("Simulado inserido com sucesso, id=" . $con->lastInsertId());
            }
            return Response::error("Erro ao inserir Simulado");
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
