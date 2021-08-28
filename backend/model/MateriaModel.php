<?php

    namespace Model;

    class MateriaModel{

        private int $id;
        private string $nome;
        private array $area;

        public function getId(): int{
            return $this->id;
        }
        public function getNome(): string{
            return $this->nome;
        }
        public function getArea(): array{
            return $this->area;
        }
        public function setNome(string $nomeMateria): void{
            $this->nome = $nomeMateria;
        }
        public function setArea(array $areaMateria): void{
            $this->area = $areaMateria;
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