<?php

namespace Model;
use Helper\Connection;
use Helper\Response;
use Model\AdministradorModel; //fazer Model ADM e Controller ADM(Aí é com você Delfs)
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
            $data = json_decode($this->get());
            if ($data->status_code === 200) {
                foreach ($data->data as $el) {
                    if (trim(strtoupper($el->tituloQuestao)) === trim(strtoupper(($tituloQuestao)))) {
                        throw new \Exception("titulo `" . $tituloQuestao . "` ja cadastrado", 400);
                        return;
                    };
                }
                $this->nome = ucfirst($tituloQuestao);
            } else {
                $this->nome = ucfirst($tituloQuestao);
            };
            return;
        }
        throw new \Exception("Esse titulo não pode ser aceito", 400);
        return;
    }

    public function setImagem(string $imagemQuestao): void
    {
        if (isset($tituloQuestao) && trim($imagemQuestao) !== '' && strlen(trim($imagemQuestao)) !== 0 && trim($imagemQuestao) !== null) {
            $data = json_decode($this->get());
            if ($data->status_code === 200) {
                foreach ($data->data as $el) {
                    if (trim(strtoupper($el->imagemQuestao)) === trim(strtoupper(($imagemQuestao)))) {
                        throw new \Exception("imagem `" . $imagemQuestao . "` ja cadastrada", 400);
                        return;
                    };
                }
                $this->nome = ucfirst($imagemQuestao);
            } else {
                $this->nome = ucfirst($imagemQuestao);
            };
            return;
        }
        throw new \Exception("Essa imagem não pode ser aceito", 400);
        return;
    }

    public function setTexto(string $textoQuestao): void
    {
        if (isset($textoQuestao) && trim($textoQuestao) !== '' && strlen(trim($textoQuestao)) !== 0 && trim($textoQuestao) !== null) {
            $data = json_decode($this->get());
            if ($data->status_code === 200) {
                foreach ($data->data as $el) {
                    if (trim(strtoupper($el->textoQuestao)) === trim(strtoupper(($textoQuestao)))) {
                        throw new \Exception("texto `" . $textoQuestao . "` ja cadastrado", 400);
                        return;
                    };
                }
                $this->nome = ucfirst($textoQuestao);
            } else {
                $this->nome = ucfirst($textoQuestao);
            };
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
                        $this->dificuldade = $dificuldade;
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
                        $this->universidade = $universidade;
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
                foreach ($data->data as $el) {
                    if ($el->idAssuntoMateria == $assuntoMateria) {
                        $this->assuntoMateria = $assuntoMateria;
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
            $modelAdministrador = new AdministradorModel(null,null,null);
            $data = json_decode($modelAdministrador->get());
            if ($data->status_code === 200) {
                foreach ($data->data as $el) {
                    if ($el->idAdministrador == $administrador) {
                        $this->administrador = $administrador;
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

    public function get($params = null)
    {
        try {
            $con = Connection::getConn();
            if ($params === null) {
                $stmt = $con->prepare("SELECT * FROM tb_questao");
            } else {
                $stmt = $con->prepare("SELECT * FROM tb_questao WHERE idQuestao = ?");
                $stmt->bindValue(1, $params['id'], PDO::PARAM_INT);
            }

            if ($stmt->execute()) {
                return $stmt->rowCount() == 0 ?
                    Response::warning("Nenhuma questão encontrada...", 404) :
                    Response::success($stmt->fetchAll(\PDO::FETCH_ASSOC));
            }
            return Response::error("Erro ao selecionar questão");
        } catch (\Throwable $th) {
            return Response::error("Error: $th");
        }
    }
    public function post()
    {
        try {
            $con = Connection::getConn();
            $stmt = $con->prepare("INSERT INTO tb_questao values(null, ?, ?, ?, ?, 1, ?)");
            $stmt->bindValue(1, trim($this->getTitulo()), PDO::PARAM_STR);
            $stmt->bindValue(1, trim($this->getTexto()), PDO::PARAM_STR);
            $stmt->bindValue(1, trim($this->getImagem()), PDO::PARAM_STR);
            $stmt->bindValue(2, trim($this->getIdDificuldade()), PDO::PARAM_INT);
            $stmt->bindValue(2, trim($this->getIdUniversidade()), PDO::PARAM_INT);
            $stmt->bindValue(2, trim($this->getIdAdministrador()), PDO::PARAM_INT);
            $stmt->bindValue(2, trim($this->getIdAssuntoMateria()), PDO::PARAM_INT);
            if ($stmt->execute()) {
                return Response::success("Questão `{$this->getTitulo()}` inserida com sucesso, id=" . $con->lastInsertId());
            }
            return Response::error("Erro ao inserir Assunto Materia");
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
