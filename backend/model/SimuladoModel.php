<?php

namespace Model;

class SimuladoModel
{

    private int $id;
    private string $horaInicio;
    private string $horaTermino;
    private array $idUsuario;
    private array $idQuestao;

    public function getId(): int
    {
        return $this->id;
    }
    public function getHoraInicio(): string
    {
        return $this->horaInicio;
    }
    public function getHoraTermino(): string
    {
        return $this->horaTermino;
    }
    public function setHoraInicio(string $horaInicioSimulado): void
    {
        $this->horaInicio = $horaInicioSimulado;
    }
    public function setHoraTermino(string $horaTerminoSimulado): void
    {
        $this->horaTermino = $horaTerminoSimulado;
    }
    public function getIdUsuario(): array
    {
        return $this->idUsuario;
    }
    public function getIdQuestao(): array
    {
        return $this->idQuestao;
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
