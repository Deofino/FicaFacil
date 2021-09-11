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
        $this->certaResposta = $certaResposta;
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
                foreach ($data->data as $el) {
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
                $stmt = $con->prepare("SELECT * FROM tb_resposta WHERE idResposta = ?");
                $stmt->bindValue(1, $params['id'], PDO::PARAM_INT);
            }

            if ($stmt->execute()) {
                return $stmt->rowCount() == 0 ?
                    Response::warning("Nenhuma resposta encontrada...", 404) :
                    Response::success($stmt->fetchAll(\PDO::FETCH_ASSOC));
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
    public function put($params)
    {
    }
    public function delete($params)
    {
    }
}
