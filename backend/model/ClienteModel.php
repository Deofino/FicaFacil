<?php

namespace Model;

use Model\UserModel;

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


    public function __construct($nome, $email, $senha, $dataAniversario, $foto, $simuladosFeitos, $simuladosRefeitos, $acertos, $erros, $videosAssistidos, $comentariosFeitos)
    {
        parent::__construct($nome, $email, $senha);

        $this->dataAniversario = $dataAniversario;
        $this->foto = $foto;
        $this->simuladosFeitos = $simuladosFeitos;
        $this->simuladosRefeitos = $simuladosRefeitos;
        $this->acertos = $acertos;
        $this->erros = $erros;
        $this->videosAssistidos = $videosAssistidos;
        $this->comentariosFeitos = $comentariosFeitos;
    }

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


    public function get($params)
    {
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
