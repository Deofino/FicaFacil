<?php

namespace Controller;

use Helper\Response;

class UserController
{

    public function index()
    {
        echo Response::success("API funcionando corretamente");
    }
}
