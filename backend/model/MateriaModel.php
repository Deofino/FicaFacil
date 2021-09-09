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
    public function setNome(string $nomeMateria): void
    {
        if (isset($nomeMateria) && trim($nomeMateria) !== '' && strlen(trim($nomeMateria)) !== 0 && trim($nomeMateria) !== null) {
            $data = json_decode($this->get());
            if ($data->status_code === 200) {
                foreach ($data->data as $el) {
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
        throw new \Exception("Essa materia não pode ser aceito", 400);
        return;
    }
    public function setArea(int $areaMateria): void
    {
        if($areaMateria > 0 && $areaMateria!==null){
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


    public function get($params=null)
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
                return $stmt->rowCount() == 0 ?
                    Response::warning("Nenhuma materia encontrada...", 404) :
                    Response::success($stmt->fetchAll(\PDO::FETCH_ASSOC));
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
                return Response::success("Materia `{$this->getNome()}` inserida com sucesso, id=" . $con->lastInsertId());
            }
            return Response::error("Erro ao inserir Materia");
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
