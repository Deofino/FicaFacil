<?php

namespace Model;

use Model\UserModel;
use PDO;
use Helper\Response;
use Helper\Connection;

class ClienteModel extends UserModel
{

    private int $id;
    private string $dataAniversario;
    private string $foto;
    private int $simuladosFeitos;
    private int $simuladosRefeitos;
    private int $acertos;
    private int $erros;
    private int $videosAssistidos;
    private int $comentariosFeitos;

    public function getId(): int
    {
        return $this->id;
    }
    public function getDataAniversario(): string
    {
        return $this->dataAniversario;
    }
    public function getFoto(): string
    {
        return $this->foto;
    }
    public function getSimuladosFeitos(): int
    {
        return $this->simuladosFeitos;
    }
    public function getSimuladosRefeitos(): int
    {
        return $this->simuladosRefeitos;
    }
    public function getAcertos(): int
    {
        return $this->acertos;
    }
    public function getErros(): int
    {
        return $this->erros;
    }
    public function getVideosAssistidos(): int
    {
        return $this->videosAssistidos;
    }
    public function getComentariosFeitos(): int
    {
        return $this->comentariosFeitos;
    }
    public function setDataAniversario(string $dataAniversarioCliente): void
    {
        $this->dataAniversario = $dataAniversarioCliente;
    }
    public function setFotoDataAniversario(string $fotoCliente): void
    {
        $this->foto = $fotoCliente;
    }
    public function setSimuladosFeitos(string $simuladosFeitosCliente): void
    {
        $this->simuladosFeitos = $simuladosFeitosCliente;
    }
    public function setSimuladosRefeitos(string $simuladosRefeitosCliente): void
    {
        $this->simuladosRefeitos = $simuladosRefeitosCliente;
    }
    public function setAcertos(string $acertosCliente): void
    {
        $this->acertos = $acertosCliente;
    }
    public function setErros(string $errosCliente): void
    {
        $this->erros = $errosCliente;
    }
    public function setVideosAssistidos(string $videosAssistidosCliente): void
    {
        $this->videosAssistidos = $videosAssistidosCliente;
    }
    public function setComentariosFeitos(string $comentariosFeitosCliente): void
    {
        $this->comentariosFeitos = $comentariosFeitosCliente;
    }


    public function get($params = null)
    {
        try {
            $con = Connection::getConn();
            if ($params === null) {
                $stmt = $con->prepare("SELECT * FROM tb_cliente");
            } else {
                $stmt = $con->prepare("SELECT * FROM tb_cliente WHERE idCliente = ?");
                $stmt->bindValue(1, $params['id'], PDO::PARAM_INT);
            }
            if ($stmt->execute()) {
                return $stmt->rowCount() == 0 ?
                    Response::warning("Nenhuma cliente encontrada...", 404) :
                    Response::success($stmt->fetchAll(\PDO::FETCH_ASSOC));
            }
            return Response::error("Erro ao selecionar cliente");
        } catch (\Throwable $th) {
            return Response::error("Error: $th");
        }
    }
    public function post($params)
    {
    }
    public function put($params)
    {
    }
    public function delete($params)
    {
    }
}
