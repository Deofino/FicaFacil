<?php

namespace Controller;

use Helper\Response;

class notFoundController
{

    public function index($route)
    {
        http_response_code(404);
        echo Response::error("API não encontrada neste enderço [" . $route['url'] . "]", 404);
    }
}
