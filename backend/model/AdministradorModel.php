<?php

    namespace Model;
    use Model\UserModel;

    class AdministradorModel extends UserModel{
        public function __construct($nome, $email,$senha)
        {
            parent::__construct($nome, $email,$senha); 
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