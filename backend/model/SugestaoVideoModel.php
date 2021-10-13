<?php

namespace Model;

use Helper\Connection;
use Helper\Response;
use Model\QuestaoModel;
use PDO;

class SugestaoVideoModel
{

    private int $id;
    private string $titulo;
    private string $thumbnailVideo;
    private string $urlVideo;
    private string $questao;

    public function getId(): int
    {
        return $this->id;
    }
    public function getTitulo(): string
    {
        return $this->titulo;
    }
    public function getThumbnailVideo(): string
    {
        return $this->thumbnailVideo;
    }
    public function getUrlVideo(): string
    {
        return $this->urlVideo;
    }
    public function getQuestao(): int
    {
        return $this->questao;
    }
    public function setTitulo(string $tituloSugestao): void
    {
        if (isset($tituloSugestao) && trim($tituloSugestao) !== '' && strlen(trim($tituloSugestao)) !== 0 && trim($tituloSugestao) !== null) {
            $this->titulo = ucfirst($tituloSugestao);
        } else {
            throw new \Exception("Essa Thumbnail Video de vídeo não pode ser aceita", 400);
        };
        return;
    }

    public function setThumbnailVideo(string $thumbnailVideo): void
    {
        if (isset($thumbnailVideo) && trim($thumbnailVideo) !== '' && strlen(trim($thumbnailVideo)) !== 0 && trim($thumbnailVideo) !== null) {

            $this->thumbnailVideo = ucfirst($thumbnailVideo);
        } else {
            throw new \Exception("Essa Thumbnail Video de vídeo não pode ser aceita", 400);
        };
        return;
    }

    public function setUrlVideo(string $urlVideo): void
    {
        if (isset($urlVideo) && trim($urlVideo) !== '' && strlen(trim($urlVideo)) !== 0 && trim($urlVideo) !== null) {

            $this->urlVideo = ucfirst($urlVideo);
        } else {
            throw new \Exception("Essa Thumbnail Video de vídeo não pode ser aceita", 400);
        };
        return;
    }
    public function setQuestao(int $questao): void
    {
        if ($questao > 0 && $questao !== null) {
            $questaoModel = new QuestaoModel();
            $data = json_decode($questaoModel->get());
            if ($data->status_code === 200) {
                foreach ($data->data->questao as $el) {
                    if ($el->idQuestao == $questao) {
                        $this->questao = $questao;
                        return;
                    };
                }
                throw new \Exception("Questão com id `" . $questao . "` não encontrada", 400);
                return;
            } else {
                throw new \Exception("Insira uma Questão primeiro", 400);
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
                $stmt = $con->prepare("SELECT * FROM tb_sugestao_video");
            } else {
                $stmt = $con->prepare("SELECT * FROM tb_sugestao_video WHERE idQuestao = ?");
                $stmt->bindValue(1, $params['id'], PDO::PARAM_INT);
            }

            if ($stmt->execute()) {
                $questao = (new QuestaoModel)->get();
                if ($stmt->rowCount() === 0) {
                    return Response::warning([
                        "Nenhuma sugestao de video encontrada...",
                        "questao" => json_decode($questao)->data
                    ], 404);
                }
                if (isset($params['id'])) {
                    $sugestaoVideo = $stmt->fetchAll(\PDO::FETCH_ASSOC);
                    $questao = (new QuestaoModel)->get(['id' => $sugestaoVideo[0]['idQuestao']]);
                    return Response::success([
                        "sugestaoVideo" => $sugestaoVideo,
                        "questao" => json_decode($questao)->data
                    ]);
                } else {
                    return Response::success([
                        "sugestaoVideo" => $stmt->fetchAll(\PDO::FETCH_ASSOC),
                        "questao" => json_decode($questao)->data
                    ]);
                }
            }
            return Response::error("Erro ao selecionar sugestão de vídeo");
        } catch (\Throwable $th) {
            return Response::error("Error: $th");
        }
    }
    public function post()
    {
        try {
            $con = Connection::getConn();
            $stmt = $con->prepare("INSERT INTO tb_sugestao_video values(null, ?, ?, ?, ?)");
            $stmt->bindValue(1, trim($this->getTitulo()), PDO::PARAM_STR);
            $stmt->bindValue(2, trim($this->getThumbnailVideo()), PDO::PARAM_STR);
            $stmt->bindValue(3, trim($this->getUrlVideo()), PDO::PARAM_STR);
            $stmt->bindValue(4, trim($this->getQuestao()), PDO::PARAM_INT);


            if ($stmt->execute()) {
                return Response::success("Sugestão Vídeo `{$this->getTitulo()}` inserida com sucesso, id=" . $con->lastInsertId());
            }
            return Response::error("Erro ao inserir Sugestão Vídeo");
        } catch (\Throwable $th) {
            return Response::error("Error: " . $th->getMessage());
        }
    }
    public function put($id)
    {
        try {
            $con = Connection::getConn();
            $stmt = $con->prepare("UPDATE tb_sugestao_video SET tituloSujestaoVideo = ? , thumbnailSujestaoVideo = ? , urlSujestaoVideo = ? , idQuestao = ? WHERE idSugestaoVideo = ?");
            $stmt->bindValue(
                1,
                trim($this->getTitulo()),
                PDO::PARAM_STR
            );
            $stmt->bindValue(2, $this->getThumbnailVideo(), PDO::PARAM_STR);
            $stmt->bindValue(3, $this->getUrlVideo(), PDO::PARAM_STR);
            $stmt->bindValue(4, $this->getQuestao(), PDO::PARAM_STR);
            $stmt->bindValue(5, $id, PDO::PARAM_INT);
            if ($stmt->execute()) {
                return Response::success("Sugestão Video `{$this->getTitulo()}` atualizada com sucesso");
            }
            return Response::error("Erro ao atualizar Sugestão Video");
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
                    $stmt = $con->prepare("DELETE FROM tb_sugestao_video WHERE idSugestaoVideo = ?");
                    $stmt->bindValue(1, trim($id), PDO::PARAM_INT);
                    if ($stmt->execute()) {
                        return Response::success("Sugestão Video id=`$id` deletada com sucesso");
                    }
                    return Response::warning("Erro ao deletar Sugestão Video", 404);
                };
            }
            return Response::warning("Sugestão Video id=$id nao encontrada", 404);
        } catch (\Throwable $th) {
            return Response::error("Error: " . $th->getMessage());
        }
    }
}
