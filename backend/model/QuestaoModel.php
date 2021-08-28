<?php

    namespace Model;

    class QuestaoModel
    {
        
        private int $id;
        private string $titulo;
        private string $texto;
        private string $imagem;
        private array $idAdministrador;
        private array $idDificuldade;
        private array $idAssuntoMateria;
        private array $idUniversidade;

        public function getId(): int{
            return $this->id;
        }
        public function getTitulo(): string{
            return $this->titulo;
        }
        public function getTexto(): string{
            return $this->texto;
        }
        public function getImagem(): string{
            return $this->imagem;
        }
        public function setTitulo(string $tituloQuestao): void{
            $this->titulo = $tituloQuestao;
        }
        public function setTexto(string $textoQuestao): void{
            $this->texto = $textoQuestao;
        }
        public function setImagem(string $imagemQuestao): void{
            $this->imagem = $imagemQuestao;
        }
        public function getIdAdministrador(): array{
            return $this->idAdministrador;
        }
        public function getIdDificuldade(): array{
            return $this->idDificuldade;
        }
        public function getAssuntoMateria(): array{
            return $this->idAssuntoMateria;
        }
        public function getIdUniversidade(): array{
            return $this->idUniversidade;
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
