<?php

namespace Model;

use Helper\Connection;
use Helper\Response;
use Model\AdministradorModel;
use Model\DificuldadeModel;
use Model\AssuntoMateriaModel;
use Model\UniversidadeModel;
use PDO;

class QuestaoModel
{

    private int $id;
    private string $titulo;
    private string $texto;
    private string $imagem;
    private int $idAdministrador;
    private int $idDificuldade;
    private int $idAssuntoMateria;
    private int $idUniversidade;

    public function getId(): int
    {
        return $this->id;
    }
    public function getTitulo(): string
    {
        return $this->titulo;
    }
    public function getTexto(): string
    {
        return $this->texto;
    }
    public function getImagem(): string
    {
        return $this->imagem;
    }
    public function getIdAdministrador(): int
    {
        return $this->idAdministrador;
    }
    public function getIdDificuldade(): int
    {
        return $this->idDificuldade;
    }
    public function getIdAssuntoMateria(): int
    {
        return $this->idAssuntoMateria;
    }
    public function getIdUniversidade(): int
    {
        return $this->idUniversidade;
    }
    public function setTitulo(string $tituloQuestao): void
    {
        if (isset($tituloQuestao) && trim($tituloQuestao) !== '' && strlen(trim($tituloQuestao)) !== 0 && trim($tituloQuestao) !== null) {
            $this->titulo = ucfirst($tituloQuestao);
            return;
        }
        throw new \Exception("Esse titulo não pode ser aceito", 400);
        return;
    }

    public function setImagem(string $imagemQuestao): void
    {
        $this->imagem = $imagemQuestao;
        return;
    }

    public function setTexto(string $textoQuestao): void
    {
        if (isset($textoQuestao) && trim($textoQuestao) !== '' && strlen(trim($textoQuestao)) !== 0 && trim($textoQuestao) !== null) {
            $this->texto = ucfirst($textoQuestao);
            return;
        }
        throw new \Exception("Esse texto não pode ser aceito", 400);
        return;
    }
    public function setIdDificuldade(int $dificuldade): void
    {
        if ($dificuldade > 0 && $dificuldade !== null) {
            $modelDificuldade = new DificuldadeModel();
            $data = json_decode($modelDificuldade->get());
            if ($data->status_code === 200) {
                foreach ($data->data as $el) {
                    if ($el->idDificuldade == $dificuldade) {
                        $this->idDificuldade = $dificuldade;
                        return;
                    };
                }
                throw new \Exception("Dificuldade com id `" . $dificuldade . "` nao encontrada", 400);
                return;
            } else {
                throw new \Exception("Insira uma dificuldade primeiro", 400);
                return;
            };
        }
        throw new \Exception("Essa dificuldade não pode ser aceita", 400);
        return;
    }

    public function setIdUniversidade(int $universidade): void
    {
        if ($universidade > 0 && $universidade !== null) {
            $modelUniversidade = new UniversidadeModel();
            $data = json_decode($modelUniversidade->get());
            if ($data->status_code === 200) {
                foreach ($data->data as $el) {
                    if ($el->idUniversidade == $universidade) {
                        $this->idUniversidade = $universidade;
                        return;
                    };
                }
                throw new \Exception("Universidade com id `" . $universidade . "` nao encontrada", 400);
                return;
            } else {
                throw new \Exception("Insira uma universidade primeiro", 400);
                return;
            };
        }
        throw new \Exception("Essa universidade não pode ser aceita", 400);
        return;
    }

    public function setIdAssuntoMateria(int $assuntoMateria): void
    {
        if ($assuntoMateria > 0 && $assuntoMateria !== null) {
            $modelAssuntoMateria = new AssuntoMateriaModel();
            $data = json_decode($modelAssuntoMateria->get());
            if ($data->status_code === 200) {
                foreach ($data->data->assuntoMateria as $el) {
                    if ($el->idAssuntoMateria == $assuntoMateria) {
                        $this->idAssuntoMateria = $assuntoMateria;
                        return;
                    };
                }
                throw new \Exception("Assunto Matéria com id `" . $assuntoMateria . "` nao encontrada", 400);
                return;
            } else {
                throw new \Exception("Insira um assunto matéria primeiro", 400);
                return;
            };
        }
        throw new \Exception("Esse assunto matéria não pode ser aceita", 400);
        return;
    }
    public function setIdAdmistrador(int $administrador): void
    {
        if ($administrador > 0 && $administrador !== null) {
            $modelAdministrador = new AdministradorModel(null, null, null);
            $data = json_decode($modelAdministrador->get());
            if ($data->status_code === 200) {
                foreach ($data->data as $el) {
                    if ($el->idAdministrador == $administrador) {
                        $this->idAdministrador = $administrador;
                        return;
                    };
                }
                throw new \Exception("Materia com id `" . $administrador . "` nao encontrada", 400);
                return;
            } else {
                throw new \Exception("Insira uma materia primeiro", 400);
                return;
            };
        }
        throw new \Exception("Esse assunto materia não pode ser aceito", 400);
        return;
    }

    public function get(string $where = '', array $send = [], $inner = '')
    {
        try {
            $con = Connection::getConn();
            $query = "SELECT * FROM tb_questao $inner";

            if ($where === '' && $send == []) {
                $stmt = $con->prepare($query);
            } else if (isset($send['id'])) {
                $stmt = $con->prepare($query . ' WHERE idQuestao = ?');
                $send = [(int)$send['id']];
            } else {
                $stmt = $con->prepare($query . $where);
            }
            if ($stmt->execute($send)) {
                $universidade = (new UniversidadeModel)->get();
                $dificuldade = (new DificuldadeModel)->get();
                $assuntoMateria = (new AssuntoMateriaModel)->get();
                $administrador = (new AdministradorModel)->get();

                $resposta = (new RespostaModel())->get();
                if ($stmt->rowCount() === 0) {
                    return Response::warning([
                        "Nenhuma Questao encontrada",
                        "universidade" => json_decode($universidade)->data,
                        "dificuldade" => json_decode($dificuldade)->data,
                        "assuntoMateria" => json_decode($assuntoMateria)->data,
                        "administrador" => json_decode($administrador)->data,
                        "respostas" => json_decode($resposta)->data

                    ], 204);
                }
                if ($stmt->rowCount() === 1 && $where != '' && isset($send['data'])) {
                    $questao = $stmt->fetchAll(\PDO::FETCH_ASSOC);
                    $universidade = (new UniversidadeModel)->get(['id' => $questao[0]['idUniversidade']]);
                    $dificuldade = (new DificuldadeModel)->get(['id' => $questao[0]['idDificuldade']]);
                    $assuntoMateria = (new AssuntoMateriaModel)->get(['id' => $questao[0]['idAssuntoMateria']]);
                    $administrador = (new AdministradorModel)->get(['id' => $questao[0]['idAdministrador']]);
                    $resposta = (new RespostaModel)->get(['id' => $questao[0]['idQuestao']]);
                    return Response::success([
                        "questao" => $questao,
                        "universidade" => json_decode($universidade)->data,
                        "dificuldade" => json_decode($dificuldade)->data,
                        "assuntoMateria" => json_decode($assuntoMateria)->data,
                        "administrador" => json_decode($administrador)->data,
                        "respostas" => json_decode($resposta)->data
                    ]);
                }
                if ($stmt->rowCount() > 0) {
                    return Response::success([
                        "questao" => $stmt->fetchAll(\PDO::FETCH_ASSOC),
                        "universidade" => json_decode($universidade)->data,
                        "dificuldade" => json_decode($dificuldade)->data,
                        "assuntoMateria" => json_decode($assuntoMateria)->data,
                        "administrador" => json_decode($administrador)->data,
                        "respostas" => json_decode($resposta)->data

                    ]);
                }
            }
            return Response::error("Erro ao selecionar questão");
        } catch (\Throwable $th) {
            json([$query . $where]);
            die;
            return Response::error("Error: " . $th->getMessage());
        }
    }
    public function post()
    {
        try {
            $con = Connection::getConn();
            $stmt = $con->prepare("INSERT INTO tb_questao values(null, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->bindValue(1, trim($this->getTitulo()), PDO::PARAM_STR);
            $stmt->bindValue(2, trim($this->getTexto()), PDO::PARAM_STR);
            $stmt->bindValue(3, trim($this->getImagem()), PDO::PARAM_STR);
            $stmt->bindValue(4, trim($this->getIdAdministrador()), PDO::PARAM_INT);
            $stmt->bindValue(5, trim($this->getIdDificuldade()), PDO::PARAM_INT);
            $stmt->bindValue(6, trim($this->getIdAssuntoMateria()), PDO::PARAM_INT);
            $stmt->bindValue(7, trim($this->getIdUniversidade()), PDO::PARAM_INT);
            if ($stmt->execute()) {
                return Response::success(["Questão `{$this->getTitulo()}` inserida com sucesso, id=" . (int)$con->lastInsertId(), $con->lastInsertId()]);
            }
            return Response::error("Erro ao inserir Assunto Materia");
        } catch (\Throwable $th) {
            return Response::error("Error: " . $th);
        }
    }
    public function put($id)
    {
        try {
            $con = Connection::getConn();
            $stmt = $con->prepare("UPDATE tb_questao SET tituloQuestao = ? , textoQuestao = ? , idUniversidade = ? , idDificuldade = ? , idAssuntoMateria = ? , idAdministrador = ?, imagensQuestao = ? WHERE idQuestao = ?");
            $stmt->bindValue(
                1,
                trim($this->getTitulo()),
                PDO::PARAM_STR
            );
            $stmt->bindValue(2, $this->getTexto(), PDO::PARAM_STR);
            $stmt->bindValue(3, $this->getIdUniversidade(), PDO::PARAM_STR);
            $stmt->bindValue(4, $this->getIdDificuldade(), PDO::PARAM_STR);
            $stmt->bindValue(5, $this->getIdAssuntoMateria(), PDO::PARAM_STR);
            $stmt->bindValue(6, $this->getIdAdministrador(), PDO::PARAM_STR);
            $stmt->bindValue(7, $this->getImagem(), PDO::PARAM_STR);
            $stmt->bindValue(8, $id, PDO::PARAM_INT);
            if ($stmt->execute()) {
                return Response::success("Questão `{$this->getTitulo()}` atualizada com sucesso");
            }
            return Response::error("Erro ao atualizar Questão");
        } catch (\Throwable $th) {
            return Response::error("Error: " . $th->getMessage());
        }
    }
    public function delete($id = -1)
    {
        try {
            if ($id !== -1 && $id !== null) {
                $con = Connection::getConn();
                $data = json_decode($this->get('', array('id' => $id)));
                if ($data->status_code === 200) {
                    $stmt = $con->prepare("DELETE FROM tb_questao WHERE idQuestao = ?");
                    $stmt->bindValue(1, trim($id), PDO::PARAM_INT);
                    if ($stmt->execute()) {
                        return Response::success("Questao id=`$id` deletada com sucesso");
                    }
                    return Response::warning("Erro ao deletar Questao", 404);
                };
            }
            return Response::warning("Questao id=$id nao encontrada", 404);
        } catch (\Throwable $th) {
            return Response::error("Error: " . $th->getMessage());
        }
    }
}
