<?php

namespace Controller;

use Helper\Response;

class QuestaoController
{

    public function index($params)
    {
        echo Response::json('JSON index ' . json_encode($params));
    }
    public function create($params)
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
