<?php

namespace Helper;

use PDO;
use Helper\Response;

abstract class Connection
{

    private static $connection = null;

    public static function getConn(): PDO
    {

        $dns = DB_DRIVER . ":host=" . DB_DATABASE_HOST . ";dbname=" . DB_DATABASE_NAME;
        $user = DB_DATABASE_USER;
        $password = DB_DATABASE_PASSWORD;
        // $options=null;
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
            PDO::ATTR_CASE => PDO::CASE_NATURAL,
            PDO::ATTR_ORACLE_NULLS => PDO::NULL_EMPTY_STRING,
            PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'",
        ];
        if (self::$connection === null) {
            try {
                self::$connection = new PDO($dns, $user, $password);
            } catch (\Throwable $th) {
                echo Response::error($th->getMessage());
            }
        }
        return self::$connection;
    }
}
