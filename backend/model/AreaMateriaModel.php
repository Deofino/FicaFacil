<?php

namespace Model;

use Helper\Connection;
use Helper\Response;
use \PDO;

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
    public function setNome(string $nome): void
    {
        if (isset($nome) && trim($nome) !== '' && strlen(trim($nome)) !== 0 && trim($nome) !== null) {
            $model = new AreaMateriaModel();
            $data = json_decode($model->get());
            if ($data->status_code === 200) {
                foreach ($data->data as $el) {
                    if (trim(strtoupper($el->nomeAreaMateria)) === trim(strtoupper(($nome)))) {
                        throw new \Exception("nome de Area da materia `" . $nome . "` ja cadastrada", 400);
                        return;
                    };
                }
                $this->nome = ucfirst($nome);
            } else {
                $this->nome = ucfirst($nome);
            };
            return;
        }
        throw new \Exception("Esse Area da materia não pode ser aceito", 400);
        return;
    }


    public function get($params=null)
    {
        try {
            $con = Connection::getConn();
            if ($params === null) {
                $stmt = $con->prepare("SELECT * FROM tb_area_materia");
            } else {
                $stmt = $con->prepare("SELECT * FROM tb_area_materia WHERE idAreaMateria = ?");
                $stmt->bindValue(1, $params['id'], \PDO::PARAM_INT);
            }

            if ($stmt->execute()) {
                return $stmt->rowCount() == 0 ?
                    Response::warning("Nenhuma Area da Materia encontrada...", 404) :
                    Response::success($stmt->fetchAll(\PDO::FETCH_ASSOC));
            }
            return Response::error("Erro ao selecionar Area da Materia");
        } catch (\Throwable $th) {
            return Response::error("Error: $th");
        }
    }
    public function post()
    {
        try {
            $con = Connection::getConn();
            $stmt = $con->prepare("INSERT INTO tb_area_materia values(null, ?)");
            $stmt->bindValue(1, trim($this->getNome()), PDO::PARAM_STR);
            if ($stmt->execute()) {
                return Response::success("Area da materia `{$this->getNome()}` inserida com sucesso, id=" . $con->lastInsertId());
            }
            return Response::error("Erro ao inserir Area da materia");
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
