<?php
header("Access-Control-Allow-Origin: *");

require_once('./vendor/autoload.php');

use Helper\Response;

if (isset($_GET['url'])) {
    $url = explode('/', $_GET['url']);

    if ($url[0] === 'api') {
        // echo 'quer acessar as rotas';

        if($url
        )

        $controller = 'Controller\\' . ucfirst($url[1]) . 'Controller';
        $function = $url[2];

    }
}
