<?php

namespace Helper;

use PDO;
use Helper\Response;

abstract class Connection
{


    public static function getConn(): PDO
    {
        $connection = null;

        $dns = DB_DRIVER . ":host=" . DB_DATABASE_HOST . ";dbname=" . DB_DATABASE_NAME;
        $user = DB_DATABASE_USER;
        $password = DB_DATABASE_PASSWORD;
        if ($connection === null) {
            try {
                $connection = new PDO($dns, $user, $password);
            } catch (\Throwable $th) {
                echo Response::error($th->getMessage());
            }
        }
        return $connection;
    }
}
