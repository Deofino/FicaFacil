<?php

use Helper\JWT;

define(
    "PROJECT_NAME",
    "FICA FACIL"
);
define(
    "FACEBOOK",
    [
        'ID'          => '297518861925944',
        'SECRET'      => 'a526b3822fc57bb337cdee78473e33fd',
        'REDIRECT'       => 'https://localhost:3000/entrar',
        'GRAPH'   => 'v2.10',
    ]
);
define(
    "HOSTNAME",
    'https://localhost/FicaFacil/backend/'
);
define(
    "PORT",
    "3000"
);
define(
    "DB_DRIVER",
    "mysql"
);
define(
    "DB_DATABASE_HOST",
    "localhost"
);
define(
    "DB_DATABASE_NAME",
    "bd_fica_facil"
);
define(
    "DB_DATABASE_USER",
    "root"
);
define(
    "DB_DATABASE_PASSWORD",
    ""
);
define(
    "EMAIL_HOST",
    "https://localhost:3000/"
);
define(
    "EMAIL_TYPE",
    "smtp"
);
define(
    "EMAIL_NAME",
    "email@example.com.br"
);
define(
    "EMAIL_PASSWORD",
    "senhacriptografada123"
);

define(
    "PASSWORD_JWT",
    "fica_facil_123"
);

function dd($data, $die = true)
{
    header("Content-Type: text/plain");
    var_dump($data);
    if ($die) die();
}
function auth()
{
    if (isset(apache_request_headers()['Authorization'])) {
        $bearer = apache_request_headers()['Authorization'];
        $token = (str_replace('Bearer ', '', $bearer));
        if (JWT::validateJWT($token)) {
            return true;
        }
        json($bearer);
    }
    // echo Response::error("Requisicao negada, sem autorizacao", 405);
    die;
}
function json($data)
{
    header("Content-Type: application/json");
    if (gettype($data) === 'array') {
        echo json_encode($data);
    } else {
        echo json_encode([$data]);
    }
}
