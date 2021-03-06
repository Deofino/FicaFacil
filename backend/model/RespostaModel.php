<?php

namespace Model;

use Helper\Connection;
use Helper\Response;
use Model\QuestaoModel;
use PDO;

class RespostaModel
{

    private int $id;
    private string $textoResposta;
    private int $certaResposta;
    private int $idQuestao;

    public function getId(): int
    {
        return $this->id;
    }
    public function getTextoResposta(): string
    {
        return $this->textoResposta;
    }
    public function getCertaResposta(): int
    {
        return $this->certaResposta;
    }
    public function setTextoResposta(string $textoResposta): void
    {
        if (isset($textoResposta) && trim($textoResposta) !== '' && strlen(trim($textoResposta)) !== 0 && trim($textoResposta) !== null) {
            $this->textoResposta = ucfirst($textoResposta);
            return;
        }
        throw new \Exception("Esse texto não pode ser aceito", 400);
        return;
    }
    public function setCertaResposta(int $certaResposta): void
    {
        if (isset($certaResposta) && trim($certaResposta) !== '' && strlen(trim($certaResposta)) !== 0 && trim($certaResposta) !== null) {
            $this->certaResposta = ucfirst($certaResposta);
            return;
        }
        throw new \Exception("Esse texto não pode ser aceito", 400);
        return;
    }
    public function getIdQuestao(): int
    {
        return $this->idQuestao;
    }
    public function setIdQuestao(int $questao): void
    {
        if ($questao > 0 && $questao !== null) {
            $modelQuestao = new QuestaoModel();
            $data = json_decode($modelQuestao->get());
            if ($data->status_code === 200) {
                foreach ($data->data->questao as $el) {
                    if ($el->idQuestao == $questao) {
                        $this->idQuestao = $questao;
                        return;
                    };
                }
                throw new \Exception("Questão com id `" . $questao . "` nao encontrada", 400);
                return;
            } else {
                throw new \Exception("Insira uma questão primeiro", 400);
                return;
            };
        }
        throw new \Exception("Essa questão não pode ser aceita", 400);
        return;
    }

    public function get($params = null)
    {
        try {
            $con = Connection::getConn();
            if ($params === null) {
                $stmt = $con->prepare("SELECT * FROM tb_resposta");
            } else {
                $stmt = $con->prepare("SELECT * FROM tb_resposta WHERE idQuestao = ?");
                $stmt->bindValue(1, $params['id'], PDO::PARAM_INT);
            }

            if ($stmt->execute()) {
                if ($stmt->rowCount() === 0) {
                    return Response::warning([
                        "Nenhuma questao encontrada...",
                    ], 404);
                }
                if ($params !== null) {
                    $resposta = $stmt->fetchAll(\PDO::FETCH_ASSOC);
                    return Response::success([
                        "resposta" => $resposta,
                    ]);
                }
                if ($stmt->rowCount() > 1) {
                    return Response::success([
                        "resposta" => $stmt->fetchAll(\PDO::FETCH_ASSOC),
                    ]);
                }
            }
            return Response::error("Erro ao selecionar resposta");
        } catch (\Throwable $th) {
            return Response::error("Error: $th");
        }
    }
    public function post()
    {
        try {
            $con = Connection::getConn();
            $stmt = $con->prepare("INSERT INTO tb_resposta values(null, ?, ?, ?)");
            $stmt->bindValue(1, trim($this->getTextoResposta()), PDO::PARAM_STR);
            $stmt->bindValue(2, trim($this->getCertaResposta()), PDO::PARAM_INT);
            $stmt->bindValue(3, trim($this->getIdQuestao()), PDO::PARAM_INT);
            if ($stmt->execute()) {
                return Response::success("Resposta `{$this->getTextoResposta()}` inserida com sucesso, id=" . $con->lastInsertId());
            }
            return Response::error("Erro ao inserir Resposta");
        } catch (\Throwable $th) {
            return Response::error("Error: " . $th->getMessage());
        }
    }
    public function put($id)
    {
        try {
            $con = Connection::getConn();
            $stmt = $con->prepare("UPDATE tb_resposta SET textoResposta = ? , certaResposta = ? , idQuestao = ? WHERE idResposta = ?");
            $stmt->bindValue(
                1,
                trim($this->getTextoResposta()),
                PDO::PARAM_STR
            );
            $stmt->bindValue(2, $this->getCertaResposta(), PDO::PARAM_INT);
            $stmt->bindValue(3, $this->getIdQuestao(), PDO::PARAM_INT);
            $stmt->bindValue(4, $id, PDO::PARAM_INT);
            if ($stmt->execute()) {
                return Response::success("Resposta `{$this->getTextoResposta()}` atualizada com sucesso");
            }
            return Response::error("Erro ao atualizar Resposta");
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
                    $stmt = $con->prepare("DELETE FROM tb_resposta WHERE idResposta = ?");
                    $stmt->bindValue(1, trim($id), PDO::PARAM_INT);
                    if ($stmt->execute()) {
                        return Response::success("Resposta id=`$id` deletada com sucesso");
                    }
                    return Response::warning("Erro ao deletar Resposta", 404);
                };
            }
            return Response::warning("Resposta id=$id nao encontrada", 404);
        } catch (\Throwable $th) {
            return Response::error("Error: " . $th->getMessage());
        }
    }
    public function deleteTodas(int $idQuestao)
    {
        try {
            $data = json_decode($this->get(['id' => $idQuestao]))->data->resposta;
            foreach ($data as $resposta) {
                $id = $resposta->idResposta;
                $this->delete($id);
            }
            return Response::success("Todas resposta da questao $idQuestao deletadas com sucesso.");
        } catch (\Throwable $th) {
            return Response::error("Error: " . $th->getMessage());
        }
    }
    public function changeCorrect($idQuestao, $textoRespostaCorreta)
    {
        try {
            $data = json_decode($this->get(['id' => $idQuestao]))->data->resposta;
            $con = Connection::getConn();

            foreach ($data as $resposta) {
                $stmt = $con->prepare("UPDATE tb_resposta SET certaResposta = ? WHERE idResposta = ?");
                // dd([$resposta->textoResposta], false);
                if ($resposta->textoResposta == $textoRespostaCorreta) {
                    $stmt->bindValue(1, 1);
                } else {
                    $stmt->bindValue(1, 0);
                }
                $stmt->bindValue(2, $resposta->idResposta);
                $stmt->execute();
            }
        } catch (\Throwable $th) {
            return Response::error("Error: " . $th->getMessage());
        }
    }
    public function countRespostas(int $idQuestao)
    {
        try {
            $conn = Connection::getConn();
            $stmt = $conn->prepare('SELECT count(idResposta) as qtde FROM tb_resposta WHERE idQuestao = ?');
            $stmt->bindValue(1, $idQuestao, PDO::PARAM_INT);
            if ($stmt->execute()) {
                return (int) $stmt->fetch(PDO::FETCH_ASSOC)['qtde'];
            } else Response::warning("Erro ao contar respostas", 500);
            return Response::warning("Questao id=$idQuestao nao encontrada", 404);
        } catch (\Throwable $th) {
            return Response::error("Error: " . $th->getMessage());
        }
    }
}
