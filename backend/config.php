<?php

use Helper\Response;
use Helper\JWT;

define(
    "PROJECT_NAME",
    "FICA FACIL"
);
define(
    "HOSTNAME",
    'https://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']
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
    echo "<hr><br>";
    var_dump($data);
    echo "<hr><br>";
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
    }
    echo Response::error("Requisicao negada, sem autorizacao", 405);
    die;
}
