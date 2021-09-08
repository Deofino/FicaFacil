<?php

namespace Controller;

use Helper\Response;

class QuestaoController
{

    public function index($params) // GET-->PEGAR
    {
        var_dump($_FILES['images']);
        
        var_dump($_POST);
    }
    public function create($params) // POST INSERIR
    {
        echo Response::json('JSON create');
    }
    public function update($params)
    {
        echo Response::json('JSON update');
    }
    public function delete($params)
    {
        echo Response::json('JSON delete');
    }
}
