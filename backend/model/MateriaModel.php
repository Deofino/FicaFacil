<?php

namespace Model;

use Helper\Connection;
use Helper\Response;
use Model\AreaMateriaModel;
use PDO;

class MateriaModel
{

    private int $id;
    private string $nome;
    private int $area;

    public function getId(): int
    {
        return $this->id;
    }
    public function getNome(): string
    {
        return $this->nome;
    }
    public function getArea(): int
    {
        return $this->area;
    }
    public function setNome(string $nomeMateria, bool $igual = true): void
    {
        if (isset($nomeMateria) && trim($nomeMateria) !== '' && strlen(trim($nomeMateria)) !== 0 && trim($nomeMateria) !== null) {
            if ($igual) {
                $data = json_decode($this->get());
                if ($data->status_code === 200) {
                    foreach ($data->data->materia as $el) {
                        if (trim(strtoupper($el->nomeMateria)) === trim(strtoupper(($nomeMateria)))) {
                            throw new \Exception("materia `" . $nomeMateria . "` ja cadastrada", 400);
                            return;
                        };
                    }
                    $this->nome = ucfirst($nomeMateria);
                } else {
                    $this->nome = ucfirst($nomeMateria);
                };
                return;
            }
            $this->nome = ucfirst($nomeMateria);
            return;
        }
        throw new \Exception("Essa materia não pode ser aceita", 400);
        return;
    }
    public function setArea(int $areaMateria): void
    {
        if ($areaMateria > 0 && $areaMateria !== null) {
            $modelArea = new AreaMateriaModel();
            $data = json_decode($modelArea->get());
            if ($data->status_code === 200) {
                foreach ($data->data as $el) {
                    if ($el->idAreaMateria == $areaMateria) {
                        $this->area = $areaMateria;
                        return;
                    };
                }
                throw new \Exception("Area materia com id `" . $areaMateria . "` nao encontrada", 400);
                return;
            } else {
                throw new \Exception("Insira uma area materia primeiro", 400);
                return;
            };
        }
        throw new \Exception("Esse materia não pode ser aceito", 400);
        return;
    }


    public function get($params = null)
    {
        try {
            $con = Connection::getConn();
            if ($params === null) {
                $stmt = $con->prepare("SELECT * FROM tb_materia");
            } else {
                $stmt = $con->prepare("SELECT * FROM tb_materia WHERE idMateria = ?");
                $stmt->bindValue(1, $params['id'], PDO::PARAM_INT);
            }

            if ($stmt->execute()) {
                $area = (new AreaMateriaModel)->get();
                if ($stmt->rowCount() === 0) {
                    return Response::warning([
                        "Nenhuma materia encontrada...",
                        "area" => json_decode($area)->data
                ], 404);
                }
                if ($stmt->rowCount() === 1) {
                    $materia = $stmt->fetchAll(\PDO::FETCH_ASSOC);
                    $area = (new AreaMateriaModel)->get(['id' => $materia[0]['idAreaMateria']]);
                    return Response::success([
                        "materia" => $materia,
                        "area" => json_decode($area)->data
                    ]);
                }
                if ($stmt->rowCount() > 1) {
                    return Response::success([
                        "materia" => $stmt->fetchAll(\PDO::FETCH_ASSOC),
                        "area" => json_decode($area)->data
                    ]);
                }
            }
            return Response::error("Erro ao selecionar materia");
        } catch (\Throwable $th) {
            return Response::error("Error: $th");
        }
    }
    public function post()
    {
        try {
            $con = Connection::getConn();
            $stmt = $con->prepare("INSERT INTO tb_materia values(null, ?, ?)");
            $stmt->bindValue(1, trim($this->getNome()), PDO::PARAM_STR);
            $stmt->bindValue(2, trim($this->getArea()), PDO::PARAM_INT);
            if ($stmt->execute()) {
                return Response::success("Matéria `{$this->getNome()}` inserida com sucesso, id=" . $con->lastInsertId());
            }
            return Response::error("Erro ao inserir Matéria");
        } catch (\Throwable $th) {
            return Response::error("Error: " . $th->getMessage());
        }
    }
    public function put($id)
    {
        try {
            $con = Connection::getConn();
            $stmt = $con->prepare("UPDATE tb_materia SET nomeMateria = ? , idAreaMateria = ? WHERE idMateria = ?");
            $stmt->bindValue(
                1,
                trim($this->getNome()),
                PDO::PARAM_STR
            );
            $stmt->bindValue(2, $this->getArea(), PDO::PARAM_INT);
            $stmt->bindValue(3, $id, PDO::PARAM_INT);
            if ($stmt->execute()) {
                return Response::success("Matéria `{$this->getNome()}` atualizada com sucesso");
            }
            return Response::error("Erro ao atualizar Matéria");
        } catch (\Throwable $th) {
            return Response::error("Error: " . $th->getMessage());
        }
    }
    public function delete($id = -1)
    {
        try {
            if ($id !== -1 && $id !== null) {
                $con = Connection::getConn();
                $data = json_decode($this->get(array('id' => $id)));
                if ($data->status_code === 200) {
                    $stmt = $con->prepare("DELETE FROM tb_materia WHERE idMateria = ?");
                    $stmt->bindValue(1, trim($id), PDO::PARAM_INT);
                    if ($stmt->execute()) {
                        return Response::success("Matéria id=`$id` deletada com sucesso");
                    }
                    return Response::warning("Erro ao deletar Matéria", 404);
                };
            }
            return Response::warning("Matéria id=$id nao encontrada", 404);
        } catch (\Throwable $th) {
            return Response::error("Error: " . $th->getMessage());
        }
    }
}
