<?php

namespace Model;

use Helper\Connection;
use Helper\Response;
use \PDO;

class UniversidadeModel
{

    private string $universidade;

    public function getUniversidade(): string
    {
        return $this->universidade;
    }

    public function setNome(string $universidade, bool $igual = true): void
    {
        if (isset($universidade) && trim($universidade) !== '' && strlen(trim($universidade)) !== 0 && trim($universidade) !== null) {
            if ($igual) {
                $model = new UniversidadeModel();
                $data = json_decode($model->get());
                if ($data->status_code === 200) {
                    foreach ($data->data as $el) {
                        if (trim(strtoupper($el->nomeUniversidade)) === trim(strtoupper(($universidade)))) {
                            throw new \Exception("Nome da Universidade `" . $universidade . "` ja cadastrada", 400);
                            return;
                        };
                    }
                    $this->universidade = ucfirst($universidade);
                } else {
                    $this->universidade = ucfirst($universidade);
                };
                return;
            }
            $this->universidade = ucfirst($universidade);
            return;
        }
        throw new \Exception("Esse Universidade não pode ser aceito", 400);
        return;
    }


    public function get($params = null,  $where = '', $send = [], $inner = '')
    {
        try {
            $con = Connection::getConn();
            $query = "SELECT * FROM tb_universidade $inner";

            if ($where === '' && $send == []) {
                $stmt = $con->prepare($query . ' ORDER BY nomeUniversidade');
            } else if (isset($send['id'])) {
                $stmt = $con->prepare($query . ' WHERE idUniversidade = ? ORDER BY nomeUniversidade');
                $send = [(int)$send['id']];
            } else {
                $stmt = $con->prepare($query . $where . ' ORDER BY nomeUniversidade');
            }
            //daqui pra baixo
            if ($stmt->execute($send)) {
                return $stmt->rowCount() == 0 ?
                    Response::warning("Nenhuma Universidade encontrada...", 404) :
                    Response::success($stmt->fetchAll(\PDO::FETCH_ASSOC));
            }
            return Response::error("Erro ao selecionar Universidade");
        } catch (\Throwable $th) {
            return Response::error("Error: $th");
        }
    }
    public function post()
    {
        try {
            $con = Connection::getConn();
            $stmt = $con->prepare("INSERT INTO tb_universidade values(null, ?)");
            $stmt->bindValue(1, trim($this->getUniversidade()), PDO::PARAM_STR);
            if ($stmt->execute()) {
                return Response::success("Universidade `{$this->getUniversidade()}` inserida com sucesso, id=" . $con->lastInsertId());
            }
            return Response::error("Erro ao inserir Universidade");
        } catch (\Throwable $th) {
            return Response::error("Error: " . $th->getMessage());
        }
    }
    public function put($id)
    {
        try {
            $con = Connection::getConn();
            $stmt = $con->prepare("UPDATE tb_universidade SET nomeUniversidade = ? WHERE idUniversidade = ?");
            $stmt->bindValue(
                1,
                trim($this->getUniversidade()),
                PDO::PARAM_STR
            );
            $stmt->bindValue(2, $id, PDO::PARAM_INT);
            if ($stmt->execute()) {
                return Response::success("Universidade `{$this->getUniversidade()}` atualizada com sucesso");
            }
            return Response::error("Erro ao atualizar universidade");
        } catch (\Throwable $th) {
            return Response::error("Error: " . $th->getMessage());
        }
    }
    public function delete(int $id)
    {
        try {
            $con = Connection::getConn();
            $data = json_decode($this->get(array('id' => $id)));
            if ($data->status_code === 200) {
                $stmt = $con->prepare("DELETE FROM tb_universidade WHERE idUniversidade = ?");
                $stmt->bindValue(1, trim($id), PDO::PARAM_INT);
                if ($stmt->execute()) {
                    return Response::success("Universidade id=`$id` deletada com sucesso");
                }
                return Response::warning("Erro ao deletar universidade", 404);
            };
            return Response::warning("Universidade id=$id nao encontrada", 404);
        } catch (\Throwable $th) {
            return Response::error("Error: " . $th->getMessage());
        }
    }
}
