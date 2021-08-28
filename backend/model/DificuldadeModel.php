<?php

namespace Model;

class DificuldadeModel
{
    private int $id;
    private string $nivel;

    public function getId(): int
    {
        return $this->id;
    }
    public function getNivel(): string
    {
        return $this->nivel;
    }
    public function setNivel(string $nivel): void
    {
        $this->nivel = $nivel;
    }

    
    public function get($params){

    }
    public function post($params){

    }
    public function put($params){
        
    }
    public function delete($params){
        
    }
}
