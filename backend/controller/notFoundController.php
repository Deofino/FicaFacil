<?php

namespace Controller;

use Helper\Response;

class notFoundController
{

    public function index()
    {
        http_response_code(404);
        echo Response::error("API não encontrada neste enderço", 404);
    }
}
