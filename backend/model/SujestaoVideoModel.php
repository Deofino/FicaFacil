<?php
    namespace Model;

    class SugestaoVideoModel{
        private int $id;
        private string $titulo;
        private string $thumbnailVideo;
        private string $urlVideo;

        public function getId(): int{
            return $this->id;
        }
        public function getTitulo(): string{
            return $this->titulo;
        }
        public function setTitulo(string $titulo): void{
            $this->nome = $titulo;
        }
        public function getThumbnailVideo(): string{
            return $this->thumbnailVideo;
        }
        public function setThumbnailVideo(string $thumbnailVideo): void{
            $this->nome = $thumbnailVideo;
        }
        public function getUrlVideo(): string{
            return $this->urlVideo;
        }
        public function setUrlVideo(string $urlVideo): void{
            $this->nome = $urlVideo;
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
