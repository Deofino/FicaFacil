<?php

namespace Model;

class AssuntoMateriaModel
{

    private $id;
    private $nome;
    private $materia;

    public function getId(): int
    {
        return $this->id;
    }
    public function getNome(): string
    {
        return $this->nome;
    }
    public function getMateria(): array
    {
        return $this->materia;
    }
    public function setNome(string $nomeAreaMateria): void
    {
        $this->nome = $nomeAreaMateria;
    }
    public function setMateria(array $materia): void
    {
        $this->materia = $materia;
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
