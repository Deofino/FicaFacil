<?php

namespace Model;

use Helper\Connection;
use Helper\Response;
use Model\MateriaModel;
use PDO;

class AssuntoMateriaModel
{

    private int $id;
    private string $nome;
    private int $materia;

    public function getId(): int
    {
        return $this->id;
    }
    public function getNome(): string
    {
        return $this->nome;
    }
    public function getMateria(): int
    {
        return $this->materia;
    }
    public function setNome(string $nomeAssuntoMateria, bool $igual = true): void
    {
        if (isset($nomeAssuntoMateria) && trim($nomeAssuntoMateria) !== '' && strlen(trim($nomeAssuntoMateria)) !== 0 && trim($nomeAssuntoMateria) !== null) {
            if ($igual) {
                $data = json_decode($this->get());
                if ($data->status_code === 200) {
                    foreach ($data->data->assuntoMateria as $el) {
                        if (trim(strtoupper($el->nomeAssuntoMateria)) === trim(strtoupper(($nomeAssuntoMateria)))) {
                            throw new \Exception("Assunto matéria `" . $nomeAssuntoMateria . "` ja cadastrada", 400);
                            return;
                        };
                    }
                    $this->nome = ucfirst($nomeAssuntoMateria);
                } else {
                    $this->nome = ucfirst($nomeAssuntoMateria);
                };
                return;
            }
            $this->nome = ucfirst($nomeAssuntoMateria);
            return;
        }
        throw new \Exception("Essa Area matéria não pode ser aceita", 400);
        return;
    }
    public function setMateria(int $materia): void
    {
        if ($materia > 0 && $materia !== null) {
            $modelMateria = new MateriaModel();
            $data = json_decode($modelMateria->get());
            if ($data->status_code === 200) {
                foreach ($data->data->materia as $el) {
                    if ($el->idMateria == $materia) {
                        $this->materia = $materia;
                        return;
                    };
                }
                throw new \Exception("Materia com id `" . $materia . "` nao encontrada", 400);
                return;
            } else {
                throw new \Exception("Insira uma materia primeiro", 400);
                return;
            };
        }
        throw new \Exception("Esse assunto materia não pode ser aceito", 400);
        return;
    }


    public function get($params = null)
    {
        try {
            $con = Connection::getConn();
            if ($params === null) {
                $stmt = $con->prepare("SELECT * FROM tb_assunto_materia");
            } else {
                $stmt = $con->prepare("SELECT * FROM tb_assunto_materia WHERE idAssuntoMateria = ?");
                $stmt->bindValue(1, $params['id'], PDO::PARAM_INT);
            }

            if ($stmt->execute()) {
                $materia = (new MateriaModel)->get();
                if ($stmt->rowCount() === 0) {
                    return Response::warning([
                        "Nenhuma materia encontrada...",
                        "materia"=> json_decode($materia)->data
                    ], 404);
                }
                if ($stmt->rowCount() === 1) {
                    $assuntoMateria = $stmt->fetchAll(\PDO::FETCH_ASSOC);
                    $materia = (new MateriaModel)->get(['id' => $assuntoMateria[0]['idMateria']]);
                    return Response::success([
                        "assuntoMateria" => $assuntoMateria,
                        "materia" => json_decode($materia)->data
                    ]);
                }
                if ($stmt->rowCount() > 1) {
                    return Response::success([
                        "assuntoMateria" => $stmt->fetchAll(\PDO::FETCH_ASSOC),
                        "materia" => json_decode($materia)->data
                    ]);
                }
            }
            return Response::error("Erro ao selecionar assunto materia");
        } catch (\Throwable $th) {
            return Response::error("Error: $th");
        }
    }
    public function post()
    {
        try {
            $con = Connection::getConn();
            $stmt = $con->prepare("INSERT INTO tb_assunto_materia values(null, ?, ?)");
            $stmt->bindValue(1, trim($this->getNome()), PDO::PARAM_STR);
            $stmt->bindValue(2, trim($this->getMateria()), PDO::PARAM_INT);
            if ($stmt->execute()) {
                return Response::success("Assunto materia `{$this->getNome()}` inserida com sucesso, id=" . $con->lastInsertId());
            }
            return Response::error("Erro ao inserir Assunto Materia");
        } catch (\Throwable $th) {
            return Response::error("Error: " . $th->getMessage());
        }
    }
    public function put($id)
    {
        try {
            $con = Connection::getConn();
            $stmt = $con->prepare("UPDATE tb_assunto_materia SET nomeAssuntoMateria = ? , idMateria = ? WHERE idAssuntoMateria = ?");
            $stmt->bindValue(
                1,
                trim($this->getNome()),
                PDO::PARAM_STR
            );
            $stmt->bindValue(2, $this->getMateria(), PDO::PARAM_INT);
            $stmt->bindValue(3, $id, PDO::PARAM_INT);
            if ($stmt->execute()) {
                return Response::success("Assunto Matéria `{$this->getNome()}` atualizada com sucesso");
            }
            return Response::error("Erro ao atualizar Assunto Matéria");
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
                    $stmt = $con->prepare("DELETE FROM tb_assunto_materia WHERE idAssuntoMateria = ?");
                    $stmt->bindValue(1, trim($id), PDO::PARAM_INT);
                    if ($stmt->execute()) {
                        return Response::success("Assunto Materia id=`$id` deletada com sucesso");
                    }
                    return Response::warning("Erro ao deletar Assunto Materia", 404);
                };
            }
            return Response::warning("Assunto Materia id=$id nao encontrada", 404);
        } catch (\Throwable $th) {
            return Response::error("Error: " . $th->getMessage());
        }
    }
}
