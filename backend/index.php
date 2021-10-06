<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: *');
require_once('./vendor/autoload.php');

use Helper\Core;
use Helper\JWT;

// GET --> PEGAR --> READ (SELECT * FROM)
// POST --> INSERIR --> INSERIR (INSERT INTO)
// PUT --> ATUALIZAR --> UPDATE (Update table)
// DELETE --> APAGAR --> DELETAR (DELETAR)

session_start();
if (isset($_GET['url'])) {
    $url = explode('/', $_GET['url']);

    $core = new Core($url);
    $core->init();
}


//administrador/login/