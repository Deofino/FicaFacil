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
            $data = json_decode($this->get());
            if ($data->status_code === 200) {
                foreach ($data->data as $el) {
                    if (trim(strtoupper($el->tituloSugestao)) === trim(strtoupper(($tituloSugestao)))) {
                        throw new \Exception("sugestão de vídeo `" . $tituloSugestao . "` já cadastrada", 400);
                        return;
                    };
                }
                $this->titulo = ucfirst($tituloSugestao);
            } else {
                $this->titulo = ucfirst($tituloSugestao);
            };
            return;
        }
        throw new \Exception("Essa sugestão de vídeo não pode ser aceita", 400);
        return;
    }

    public function setThumbnailVideo(string $thumbnailVideo): void
    {
        if (isset($thumbnailVideo) && trim($thumbnailVideo) !== '' && strlen(trim($thumbnailVideo)) !== 0 && trim($thumbnailVideo) !== null) {
            $data = json_decode($this->get());
            if ($data->status_code === 200) {
                foreach ($data->data as $el) {
                    if (trim(strtoupper($el->thumbnailVideo)) === trim(strtoupper(($thumbnailVideo)))) {
                        throw new \Exception("Thumbnail Vídeo `" . $thumbnailVideo . "` já cadastrada", 400);
                        return;
                    };
                }
                $this->thumbnailVideo = ucfirst($thumbnailVideo);
            } else {
                $this->thumbnailVideo = ucfirst($thumbnailVideo);
            };
            return;
        }
        throw new \Exception("Essa Thumbnail Video de vídeo não pode ser aceita", 400);
        return;
    }
    
    public function setUrlVideo(string $urlVideo): void
    {
        if (isset($urlVideo) && trim($urlVideo) !== '' && strlen(trim($urlVideo)) !== 0 && trim($urlVideo) !== null) {
            $data = json_decode($this->get());
            if ($data->status_code === 200) {
                foreach ($data->data as $el) {
                    if (trim(strtoupper($el->urlVideo)) === trim(strtoupper(($urlVideo)))) {
                        throw new \Exception("URL do vídeo`" . $urlVideo . "` ja cadastrada", 400);
                        return;
                    };
                }
                $this->urlVideo = ucfirst($urlVideo);
            } else {
                $this->urlVideo = ucfirst($urlVideo);
            };
            return;
        }
        throw new \Exception("Essa URL do vídeo não pode ser aceita", 400);
        return;
    }
    public function setQuestao(int $questao): void
    {
        if($questao > 0 && $questao!==null){
            $questaoModel = new QuestaoModel();
            $data = json_decode($questaoModel->get());
            if ($data->status_code === 200) {
                foreach ($data->data as $el) {
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
        throw new \Exception("Esse questão não pode ser aceito", 400);
        return;
    }


    public function get($params=null)
    {
        try {
            $con = Connection::getConn();
            if ($params === null) {
                $stmt = $con->prepare("SELECT * FROM tb_sugestao_video");
            } else {
                $stmt = $con->prepare("SELECT * FROM tb_sugestao_video WHERE idSugestaoVideo = ?");
                $stmt->bindValue(1, $params['id'], PDO::PARAM_INT);
            }

            if ($stmt->execute()) {
                return $stmt->rowCount() == 0 ?
                    Response::warning("Nenhuma sugestão de vídeo encontrada...", 404) :
                    Response::success($stmt->fetchAll(\PDO::FETCH_ASSOC));
            }
            return Response::error("Erro ao selecionar sugestão de vídeo");
        } catch (\Throwable $th) {
            return Response::error("Error: $th");
    }

    }
    public function post($params)
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
    public function put($params)
    {
    }
    public function delete($params)
    {
    }
}