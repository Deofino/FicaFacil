<?php

namespace Model;

use Helper\Connection;
use Helper\Response;
use PDO;

class DificuldadeModel
{
    private string $nivel;

    public function getNivel(): string
    {
        return $this->nivel;
    }
    public function setNivel(string $nivel): void
    {
        if (isset($nivel) && trim($nivel) !== '' && strlen(trim($nivel)) !== 0 && trim($nivel) !== null) {
            $model = new DificuldadeModel();
            $data = json_decode($model->get());
            if ($data->status_code === 200) {
                foreach ($data->data as $el) {
                    if (trim(strtoupper($el->nivelDificuldade)) === trim(strtoupper(($nivel)))) {
                        throw new \Exception("Nivel de dificuldade `" . $nivel . "` ja cadastrada", 400);
                        return;
                    };
                }
                $this->nivel = ucfirst($nivel);
                return;
            };
        }
        throw new \Exception("Esse nivel de dificuldade não pode ser aceito", 400);
    }


    public function get($params = null)
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
                return ($stmt->rowCount() == 0 ?
                    Response::warning("Nenhuma dificuldade encontrada...", 404) :
                    $stmt->rowCount() == 1) ?
                    Response::success($stmt->fetch(\PDO::FETCH_ASSOC)) :
                    Response::success($stmt->fetchAll(\PDO::FETCH_ASSOC));
            }
            return Response::error("Erro ao selecionar dificuldade");
        } catch (\Throwable $th) {
            return Response::error("Error: $th");
        }
    }

    public function post()
    {
        try {
            $con = Connection::getConn();
            $stmt = $con->prepare("INSERT INTO tb_dificuldade values(null, ?)");
            $stmt->bindValue(1, trim($this->getNivel()), PDO::PARAM_STR);
            if ($stmt->execute()) {
                return Response::success("Dificuldade `{$this->getNivel()}` inserida com sucesso, id=" . $con->lastInsertId());
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
