<?php

namespace Model;

class AreaMateriaModel
{

    private int $id;
    private string $nome;

    public function getId(): int
    {
        return $this->id;
    }
    public function getNome(): string
    {
        return $this->nome;
    }
    public function setNome(string $nomeAreaMateria): void
    {
        $this->nome = $nomeAreaMateria;
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
