<?php
header("Access-Control-Allow-Origin: *");

require_once('./vendor/autoload.php');

use Helper\Core;

if (isset($_GET['url'])) {
    $url = explode('/', $_GET['url']);

    $core = new Core($url);
    $core->init();
}
