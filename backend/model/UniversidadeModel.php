<?php
    namespace Model;

    class UniversidadeModel{
        
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
        public function setNivel(string $nomeUniversidade): void
        {
            $this->nivel = $nomeUniversidade;
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
